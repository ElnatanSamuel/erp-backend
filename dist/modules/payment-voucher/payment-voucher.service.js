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
exports.PaymentVoucherService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payment_voucher_schema_1 = require("./schemas/payment-voucher.schema");
let PaymentVoucherService = class PaymentVoucherService {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(input) {
        if (!input.subject || !String(input.subject).trim()) {
            throw new common_1.BadRequestException('Subject is required');
        }
        const doc = new this.model({
            subject: String(input.subject).trim(),
            date: input.date ? new Date(input.date) : new Date(),
            preparedBy: input.preparedBy || '',
            sendTo: input.sendTo || '',
            items: input.items || [],
            totalUnitPrice: Number(input.totalUnitPrice || 0),
            totalAmount: Number(input.totalAmount || 0),
            totalVatAmount: Number(input.totalVatAmount || 0),
            totalWhtAmount: Number(input.totalWhtAmount || 0),
            totalNetAmount: Number(input.totalNetAmount || 0),
            netAmountInWords: input.netAmountInWords || '',
            accountName: input.accountName || '',
            accountNumber: input.accountNumber || '',
            bankName: input.bankName || '',
            status: input.status || 'Pending',
        });
        await doc.save();
        return { id: String(doc._id) };
    }
    async list({ q, page = 1, limit = 16 }) {
        const filter = {};
        if (q && q.trim()) {
            const rx = new RegExp(q.trim(), 'i');
            filter.$or = [
                { subject: rx },
                { preparedBy: rx },
                { sendTo: rx },
            ];
        }
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            this.model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            this.model.countDocuments(filter).exec(),
        ]);
        return {
            items: items.map((x) => ({
                id: String(x._id),
                subject: x.subject,
                date: x.date,
                preparedBy: x.preparedBy,
                sendTo: x.sendTo,
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
        const doc = await this.model.findById(id);
        if (!doc)
            throw new common_1.BadRequestException('Payment voucher not found');
        if (input.subject !== undefined)
            doc.subject = String(input.subject).trim();
        if (input.date !== undefined)
            doc.date = new Date(input.date);
        if (input.preparedBy !== undefined)
            doc.preparedBy = input.preparedBy;
        if (input.sendTo !== undefined)
            doc.sendTo = input.sendTo;
        if (input.items !== undefined)
            doc.items = input.items;
        if (input.totalUnitPrice !== undefined)
            doc.totalUnitPrice = Number(input.totalUnitPrice);
        if (input.totalAmount !== undefined)
            doc.totalAmount = Number(input.totalAmount);
        if (input.totalVatAmount !== undefined)
            doc.totalVatAmount = Number(input.totalVatAmount);
        if (input.totalWhtAmount !== undefined)
            doc.totalWhtAmount = Number(input.totalWhtAmount);
        if (input.totalNetAmount !== undefined)
            doc.totalNetAmount = Number(input.totalNetAmount);
        if (input.netAmountInWords !== undefined)
            doc.netAmountInWords = input.netAmountInWords;
        if (input.accountName !== undefined)
            doc.accountName = input.accountName;
        if (input.accountNumber !== undefined)
            doc.accountNumber = input.accountNumber;
        if (input.bankName !== undefined)
            doc.bankName = input.bankName;
        if (input.status !== undefined)
            doc.status = input.status;
        await doc.save();
        return { id: String(doc._id) };
    }
    async delete(id) {
        await this.model.findByIdAndDelete(id).exec();
        return { ok: true };
    }
    async count() {
        return this.model.countDocuments({}).exec();
    }
};
exports.PaymentVoucherService = PaymentVoucherService;
exports.PaymentVoucherService = PaymentVoucherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payment_voucher_schema_1.PaymentVoucher.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PaymentVoucherService);
//# sourceMappingURL=payment-voucher.service.js.map