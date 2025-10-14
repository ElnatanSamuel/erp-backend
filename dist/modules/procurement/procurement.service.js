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
exports.ProcurementService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const procurement_schema_1 = require("./schemas/procurement.schema");
let ProcurementService = class ProcurementService {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(input) {
        if (!input.itemName || !String(input.itemName).trim()) {
            throw new common_1.BadRequestException('Item name is required');
        }
        const qty = Number(input.quantity || 1);
        if (!Number.isFinite(qty) || qty < 0) {
            throw new common_1.BadRequestException('Quantity must be a non-negative number');
        }
        const unitPrice = Number(input.unitPrice || 0);
        if (!Number.isFinite(unitPrice) || unitPrice < 0) {
            throw new common_1.BadRequestException('Unit price must be a non-negative number');
        }
        const totalPrice = Number(input.totalPrice || 0);
        const doc = new this.model({
            itemName: String(input.itemName).trim(),
            quantity: qty,
            unitPrice,
            totalPrice,
            requestedBy: input.requestedBy || '',
            sentTo: input.sentTo || '',
            date: input.date ? new Date(input.date) : new Date(),
            status: input.status || 'Pending',
            addAttachment: input.addAttachment || '',
            attachmentType: input.attachmentType || '',
            hasAttachment: input.hasAttachment || 'No',
            vatPercent: Number(input.vatPercent || 0),
            vatAmount: Number(input.vatAmount || 0),
            grossAmount: Number(input.grossAmount || 0),
            accountName: input.accountName || '',
            accountNumber: input.accountNumber || '',
            bankName: input.bankName || '',
            initiatedBy: input.initiatedBy || input.requestedBy || '',
            verifiedBy: input.verifiedBy || '',
            approvedBy: input.approvedBy || '',
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
                { itemName: rx },
                { purpose: rx },
                { requestedBy: rx },
                { sentTo: rx },
                { supplier: rx },
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
                itemName: x.itemName,
                quantity: x.quantity,
                unitPrice: x.unitPrice,
                totalPrice: x.totalPrice,
                requestedBy: x.requestedBy,
                sentTo: x.sentTo,
                date: x.date,
                status: x.status,
                hasAttachment: x.hasAttachment,
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
            throw new common_1.BadRequestException('Procurement not found');
        if (input.itemName !== undefined)
            doc.itemName = String(input.itemName).trim();
        if (input.quantity !== undefined) {
            const qty = Number(input.quantity);
            if (!Number.isFinite(qty) || qty < 0)
                throw new common_1.BadRequestException('Invalid quantity');
            doc.quantity = qty;
        }
        if (input.unitPrice !== undefined) {
            const price = Number(input.unitPrice);
            if (!Number.isFinite(price) || price < 0)
                throw new common_1.BadRequestException('Invalid unit price');
            doc.unitPrice = price;
        }
        if (input.totalPrice !== undefined)
            doc.totalPrice = Number(input.totalPrice);
        if (input.requestedBy !== undefined)
            doc.requestedBy = input.requestedBy;
        if (input.sentTo !== undefined)
            doc.sentTo = input.sentTo;
        if (input.status !== undefined)
            doc.status = input.status;
        if (input.date !== undefined)
            doc.date = new Date(input.date);
        if (input.addAttachment !== undefined)
            doc.addAttachment = input.addAttachment;
        if (input.attachmentType !== undefined)
            doc.attachmentType = input.attachmentType;
        if (input.hasAttachment !== undefined)
            doc.hasAttachment = input.hasAttachment;
        if (input.vatPercent !== undefined)
            doc.vatPercent = Number(input.vatPercent);
        if (input.vatAmount !== undefined)
            doc.vatAmount = Number(input.vatAmount);
        if (input.grossAmount !== undefined)
            doc.grossAmount = Number(input.grossAmount);
        if (input.accountName !== undefined)
            doc.accountName = input.accountName;
        if (input.accountNumber !== undefined)
            doc.accountNumber = input.accountNumber;
        if (input.bankName !== undefined)
            doc.bankName = input.bankName;
        if (input.initiatedBy !== undefined)
            doc.initiatedBy = input.initiatedBy;
        if (input.verifiedBy !== undefined)
            doc.verifiedBy = input.verifiedBy;
        if (input.approvedBy !== undefined)
            doc.approvedBy = input.approvedBy;
        if (input.verifierSignature !== undefined)
            doc.verifierSignature = input.verifierSignature;
        if (input.authorizerSignature !== undefined)
            doc.authorizerSignature = input.authorizerSignature;
        await doc.save();
        return { id: String(doc._id) };
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
                { $group: { _id: null, sum: { $sum: { $ifNull: ['$totalPrice', 0] } } } },
            ]).exec(),
        ]);
        const totalAmount = agg && agg[0] ? agg[0].sum : 0;
        return { total, totalAmount, pending, approved };
    }
};
exports.ProcurementService = ProcurementService;
exports.ProcurementService = ProcurementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(procurement_schema_1.Procurement.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProcurementService);
//# sourceMappingURL=procurement.service.js.map