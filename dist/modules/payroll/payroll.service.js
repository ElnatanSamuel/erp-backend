"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const salary_definition_schema_1 = require("./schemas/salary-definition.schema");
const tax_definition_schema_1 = require("./schemas/tax-definition.schema");
const payslip_schema_1 = require("./schemas/payslip.schema");
let PayrollService = class PayrollService {
    model;
    taxModel;
    payslipModel;
    constructor(model, taxModel, payslipModel) {
        this.model = model;
        this.taxModel = taxModel;
        this.payslipModel = payslipModel;
    }
    async createDefinition(input) {
        const doc = new this.model({
            title: input.title,
            level: input.level,
            basicSalary: Number(input.basicSalary),
            allowance: Number(input.allowance),
            grossSalary: Number(input.grossSalary),
            deductions: Number(input.deductions),
            netSalary: Number(input.netSalary),
        });
        await doc.save();
        return { id: String(doc._id) };
    }
    // ---- Tax Definitions ----
    async createTaxDefinition(input) {
        const taxType = (input.taxType || '').trim();
        const percent = Number(input.percent);
        if (!taxType)
            throw new common_1.BadRequestException('Tax type is required');
        if (!Number.isFinite(percent) || percent < 0)
            throw new common_1.BadRequestException('Percent must be a non-negative number');
        const doc = new this.taxModel({ taxType, percent });
        await doc.save();
        return { id: String(doc._id) };
    }
    async listTaxDefinitions({ page = 1, limit = 50 }) {
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            this.taxModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            this.taxModel.countDocuments().exec(),
        ]);
        return {
            items: items.map((x) => ({ id: String(x._id), taxType: x.taxType, percent: x.percent })),
            total,
            page,
            limit,
        };
    }
    async getTaxDefinition(id) {
        const x = await this.taxModel.findById(id).lean();
        if (!x)
            return null;
        return { id: String(x._id), taxType: x.taxType, percent: x.percent };
    }
    async updateTaxDefinition(id, input) {
        const update = {};
        if (input.taxType !== undefined) {
            const v = String(input.taxType).trim();
            if (!v)
                throw new common_1.BadRequestException('Tax type is required');
            update.taxType = v;
        }
        if (input.percent !== undefined) {
            const p = Number(input.percent);
            if (!Number.isFinite(p) || p < 0)
                throw new common_1.BadRequestException('Percent must be a non-negative number');
            update.percent = p;
        }
        await this.taxModel.findByIdAndUpdate(id, { $set: update }).exec();
        return { ok: true };
    }
    async deleteTaxDefinition(id) {
        await this.taxModel.findByIdAndDelete(id).exec();
        return { ok: true };
    }
    // ---- Payslips ----
    async createPayslip(input) {
        const numbers = [
            'basicSalary', 'housingAllowance', 'transportAllowance', 'utilityAllowance', 'productivityAllowance', 'communicationAllowance', 'inconvenienceAllowance', 'grossSalary', 'taxPayee', 'employeePension', 'totalDeduction', 'netSalary',
        ];
        for (const k of numbers) {
            const v = Number(input[k] ?? 0);
            if (!Number.isFinite(v) || v < 0)
                throw new common_1.BadRequestException(`${k} must be a non-negative number`);
        }
        const grossSalary = Number(input.grossSalary ?? 0);
        const totalDeduction = Number(input.totalDeduction ?? 0);
        const netSalary = Number(input.netSalary ?? Math.max(0, grossSalary - totalDeduction));
        const doc = new this.payslipModel({
            staffName: input.staffName,
            title: input.title,
            level: input.level,
            paymentName: input.paymentName,
            payMonth: input.payMonth,
            payYear: input.payYear,
            basicSalary: Number(input.basicSalary ?? 0),
            housingAllowance: Number(input.housingAllowance ?? 0),
            transportAllowance: Number(input.transportAllowance ?? 0),
            utilityAllowance: Number(input.utilityAllowance ?? 0),
            productivityAllowance: Number(input.productivityAllowance ?? 0),
            communicationAllowance: Number(input.communicationAllowance ?? 0),
            inconvenienceAllowance: Number(input.inconvenienceAllowance ?? 0),
            grossSalary,
            taxPayee: Number(input.taxPayee ?? 0),
            employeePension: Number(input.employeePension ?? 0),
            totalDeduction,
            netSalary,
        });
        await doc.save();
        return { id: String(doc._id) };
    }
    async listPayslips({ page = 1, limit = 50 }) {
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            this.payslipModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            this.payslipModel.countDocuments().exec(),
        ]);
        return {
            items: items.map((x) => ({
                id: String(x._id),
                staffName: x.staffName,
                title: x.title,
                level: x.level,
                paymentName: x.paymentName,
                payMonth: x.payMonth,
                payYear: x.payYear,
                basicSalary: x.basicSalary,
                allowances: (x.housingAllowance || 0) + (x.transportAllowance || 0) + (x.utilityAllowance || 0) + (x.productivityAllowance || 0) + (x.communicationAllowance || 0) + (x.inconvenienceAllowance || 0),
                grossSalary: x.grossSalary,
                deduction: x.totalDeduction,
                netSalary: x.netSalary,
                createdAt: x.createdAt,
            })),
            total,
            page,
            limit,
        };
    }
    async getPayslip(id) {
        const x = await this.payslipModel.findById(id).lean();
        if (!x)
            return null;
        return { id: String(x._id), ...x };
    }
    async updatePayslip(id, input) {
        const update = {};
        const allowed = [
            'staffName', 'title', 'level', 'basicSalary', 'housingAllowance', 'transportAllowance', 'utilityAllowance', 'productivityAllowance', 'communicationAllowance', 'inconvenienceAllowance', 'grossSalary', 'taxPayee', 'employeePension', 'totalDeduction', 'netSalary',
        ];
        for (const k of allowed) {
            if (k in input && input[k] !== undefined) {
                const numeric = ['basicSalary', 'housingAllowance', 'transportAllowance', 'utilityAllowance', 'productivityAllowance', 'communicationAllowance', 'inconvenienceAllowance', 'grossSalary', 'taxPayee', 'employeePension', 'totalDeduction', 'netSalary'];
                if (numeric.includes(k)) {
                    const v = Number(input[k]);
                    if (!Number.isFinite(v) || v < 0)
                        throw new common_1.BadRequestException(`${k} must be a non-negative number`);
                    update[k] = v;
                }
                else {
                    update[k] = input[k];
                }
            }
        }
        await this.payslipModel.findByIdAndUpdate(id, { $set: update }).exec();
        return { ok: true };
    }
    async deletePayslip(id) {
        await this.payslipModel.findByIdAndDelete(id).exec();
        return { ok: true };
    }
    async createPayslipsBatch(items, date) {
        if (!Array.isArray(items) || items.length === 0)
            return { created: 0, ids: [] };
        const docs = [];
        const dt = date ? new Date(date) : undefined;
        const useDate = dt && !isNaN(dt.getTime()) ? dt : undefined;
        for (const input of items) {
            const numbers = [
                'basicSalary', 'housingAllowance', 'transportAllowance', 'utilityAllowance', 'productivityAllowance', 'communicationAllowance', 'inconvenienceAllowance', 'grossSalary', 'taxPayee', 'employeePension', 'totalDeduction', 'netSalary',
            ];
            const accum = {};
            for (const k of numbers) {
                const v = Number(input[k] ?? 0);
                if (!Number.isFinite(v) || v < 0)
                    throw new common_1.BadRequestException(`${k} must be a non-negative number`);
                accum[k] = v;
            }
            const grossSalary = Number(input.grossSalary ?? 0);
            const totalDeduction = Number(input.totalDeduction ?? 0);
            const netSalary = Number(input.netSalary ?? Math.max(0, grossSalary - totalDeduction));
            // derive month/year from date if not provided
            let payMonth = input.payMonth;
            let payYear = input.payYear;
            if ((!payMonth || !payYear) && useDate) {
                const m = useDate.toLocaleString('en-US', { month: 'long' });
                const y = String(useDate.getFullYear());
                payMonth = payMonth || m;
                payYear = payYear || y;
            }
            const candidate = {
                staffName: input.staffName,
                title: input.title,
                level: input.level,
                paymentName: input.paymentName,
                payMonth,
                payYear,
                basicSalary: accum.basicSalary,
                housingAllowance: accum.housingAllowance,
                transportAllowance: accum.transportAllowance,
                utilityAllowance: accum.utilityAllowance,
                productivityAllowance: accum.productivityAllowance,
                communicationAllowance: accum.communicationAllowance,
                inconvenienceAllowance: accum.inconvenienceAllowance,
                grossSalary,
                taxPayee: accum.taxPayee,
                employeePension: accum.employeePension,
                totalDeduction,
                netSalary,
                ...(useDate ? { createdAt: useDate } : {}),
            };
            // skip duplicates by staffName + payMonth + payYear (+ paymentName if provided)
            const criteria = {
                staffName: candidate.staffName,
                ...(candidate.payMonth ? { payMonth: candidate.payMonth } : {}),
                ...(candidate.payYear ? { payYear: candidate.payYear } : {}),
            };
            if (candidate.paymentName)
                criteria.paymentName = candidate.paymentName;
            const exists = await this.payslipModel.findOne(criteria).lean();
            if (exists)
                continue;
            docs.push(candidate);
        }
        const res = await this.payslipModel.insertMany(docs);
        return { created: res.length, ids: res.map((d) => String(d._id)) };
    }
    async getDefinition(id) {
        const x = await this.model.findById(id).lean();
        if (!x)
            return null;
        return {
            id: String(x._id),
            title: x.title,
            level: x.level,
            basicSalary: x.basicSalary,
            allowance: x.allowance,
            grossSalary: x.grossSalary,
            deductions: x.deductions,
            netSalary: x.netSalary,
        };
    }
    async updateDefinition(id, input) {
        const update = {};
        for (const k of ['title', 'level', 'basicSalary', 'allowance', 'grossSalary', 'deductions', 'netSalary']) {
            if (k in input && input[k] !== undefined)
                update[k] = input[k];
        }
        await this.model.findByIdAndUpdate(id, { $set: update }).exec();
        return { ok: true };
    }
    async deleteDefinition(id) {
        await this.model.findByIdAndDelete(id).exec();
        return { ok: true };
    }
    async listDefinitions({ page = 1, limit = 50 }) {
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            this.model.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            this.model.countDocuments().exec(),
        ]);
        return {
            items: items.map((x) => ({
                id: String(x._id),
                title: x.title,
                level: x.level,
                basicSalary: x.basicSalary,
                allowance: x.allowance,
                grossSalary: x.grossSalary,
                deductions: x.deductions,
                netSalary: x.netSalary,
            })),
            total,
            page,
            limit,
        };
    }
    async kpis() {
        // Compute gross/net from Salary Definitions
        const sums = await this.model.aggregate([
            {
                $group: {
                    _id: null,
                    gross: { $sum: '$grossSalary' },
                    net: { $sum: '$netSalary' },
                },
            },
        ]);
        const gross = sums[0]?.gross || 0;
        const net = sums[0]?.net || 0;
        // Keep tax and loan constants per product requirement
        const tax = 500_000;
        const loan = 150_000;
        return { gross, tax, loan, net };
    }
    async summary() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentYear = new Date().getFullYear();
        // Aggregate payslips by month for the current year
        const payslipData = await this.payslipModel.aggregate([
            {
                $match: {
                    payYear: String(currentYear),
                },
            },
            {
                $group: {
                    _id: '$payMonth',
                    totalGross: { $sum: '$grossSalary' },
                    totalNet: { $sum: '$netSalary' },
                    totalTax: { $sum: '$taxPayee' },
                    totalPension: { $sum: '$employeePension' },
                },
            },
        ]);
        // Create a map of month -> data
        const dataMap = new Map();
        for (const item of payslipData) {
            const monthName = item._id;
            dataMap.set(monthName, {
                gross: item.totalGross || 0,
                net: item.totalNet || 0,
                tax: item.totalTax || 0,
                loan: item.totalPension || 0, // Using pension as "loan" for chart
            });
        }
        // Build series with actual data or zeros
        const series = months.map((month) => {
            const data = dataMap.get(month);
            if (data) {
                return data;
            }
            return { gross: 0, net: 0, tax: 0, loan: 0 };
        });
        return { months, series };
    }
};
exports.PayrollService = PayrollService;
exports.PayrollService = PayrollService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(salary_definition_schema_1.SalaryDefinition.name)),
    __param(1, (0, mongoose_1.InjectModel)(tax_definition_schema_1.TaxDefinition.name)),
    __param(2, (0, mongoose_1.InjectModel)(payslip_schema_1.Payslip.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PayrollService);
//# sourceMappingURL=payroll.service.js.map