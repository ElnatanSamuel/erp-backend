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
exports.LogisticsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const logistic_schema_1 = require("./schemas/logistic.schema");
let LogisticsService = class LogisticsService {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(input) {
        if (!input.title || !String(input.title).trim())
            throw new common_1.BadRequestException('Title is required');
        const amt = Number(input.amount || 0);
        if (!Number.isFinite(amt) || amt < 0)
            throw new common_1.BadRequestException('Amount must be a non-negative number');
        const doc = new this.model({
            title: String(input.title).trim(),
            purpose: input.purpose || '',
            amount: amt,
            requestedBy: input.requestedBy || '',
            sentTo: input.sentTo || '',
            date: input.date ? new Date(input.date) : new Date(),
            status: input.status || 'Pending',
            dateFrom: input.dateFrom ? new Date(input.dateFrom) : undefined,
            dateTo: input.dateTo ? new Date(input.dateTo) : undefined,
            voucherName: input.voucherName || '',
            voucherUrl: input.voucherUrl || '',
            accountName: input.accountName || '',
            accountNumber: input.accountNumber || '',
            bankName: input.bankName || '',
            verifierSignature: input.verifierSignature || '',
            authorizerSignature: input.authorizerSignature || '',
        });
        await doc.save();
        return { id: String(doc._id) };
    }
    async list({ q, status, page = 1, limit = 13 }) {
        const filter = {};
        if (q && q.trim()) {
            const rx = new RegExp(q.trim(), 'i');
            filter.$or = [
                { title: rx },
                { purpose: rx },
                { requestedBy: rx },
                { sentTo: rx },
            ];
        }
        if (status && status !== 'All')
            filter.status = status;
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            this.model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            this.model.countDocuments(filter).exec(),
        ]);
        return {
            items: items.map((x) => ({
                id: String(x._id),
                title: x.title,
                purpose: x.purpose,
                amount: x.amount,
                requestedBy: x.requestedBy,
                sentTo: x.sentTo,
                date: x.date,
                status: x.status,
            })),
            total,
            page,
            limit,
        };
    }
    async get(id) {
        const x = await this.model.findById(id).lean();
        if (!x)
            return null;
        return { id: String(x._id), ...x };
    }
    async update(id, input) {
        const update = {};
        if (input.status)
            update.status = input.status;
        if (input.remarks !== undefined)
            update.remarks = input.remarks;
        if (input.voucherName !== undefined)
            update.voucherName = input.voucherName;
        if (input.voucherUrl !== undefined)
            update.voucherUrl = input.voucherUrl;
        const doc = await this.model.findByIdAndUpdate(id, update, { new: true }).lean();
        if (!doc)
            throw new common_1.BadRequestException('Logistics request not found');
        return { id: String(doc._id), ...doc };
    }
    async delete(id) {
        await this.model.findByIdAndDelete(id).exec();
        return { ok: true };
    }
    async kpis() {
        const [total, pending, approved, agg] = await Promise.all([
            this.model.countDocuments({}).exec(),
            this.model.countDocuments({ status: 'Pending' }).exec(),
            this.model.countDocuments({ status: 'Approved' }).exec(),
            this.model.aggregate([
                { $group: { _id: null, sum: { $sum: { $ifNull: ['$amount', 0] } } } },
            ]).exec(),
        ]);
        const totalAmount = agg && agg[0] ? agg[0].sum : 0;
        return { total, totalAmount, pending, approved };
    }
};
exports.LogisticsService = LogisticsService;
exports.LogisticsService = LogisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(logistic_schema_1.Logistic.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LogisticsService);
//# sourceMappingURL=logistics.service.js.map