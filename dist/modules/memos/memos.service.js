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
exports.MemosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const memo_schema_1 = require("./schemas/memo.schema");
let MemosService = class MemosService {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(input) {
        if (!input.title || !String(input.title).trim()) {
            throw new common_1.BadRequestException('Title is required');
        }
        const doc = new this.model({
            title: String(input.title).trim(),
            sentFrom: input.sentFrom || '',
            sentTo: input.sentTo || '',
            date: input.date ? new Date(input.date) : new Date(),
            hasAttachment: !!input.hasAttachment,
            type: input.type || 'Sent',
            action: input.action || '',
            attachmentType: input.attachmentType || '',
            body: input.body || '',
            cc: Array.isArray(input.cc) ? input.cc.filter((x) => !!x && String(x).trim()) : [],
            attachmentName: input.attachmentName || '',
            attachmentUrl: input.attachmentUrl || '',
        });
        await doc.save();
        return { id: String(doc._id) };
    }
    async list({ q, type, page = 1, limit = 16 }) {
        const filter = {};
        if (q && q.trim()) {
            const rx = new RegExp(q.trim(), 'i');
            filter.$or = [
                { title: rx },
                { sentFrom: rx },
                { sentTo: rx },
            ];
        }
        if (type && type !== 'All')
            filter.type = type;
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            this.model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            this.model.countDocuments(filter).exec(),
        ]);
        return {
            items: items.map((x) => ({
                id: String(x._id),
                title: x.title,
                sentFrom: x.sentFrom,
                sentTo: x.sentTo,
                date: x.date,
                hasAttachment: !!x.hasAttachment,
                type: x.type || 'Sent',
                action: x.action || '',
                attachmentType: x.attachmentType || '',
                cc: Array.isArray(x.cc) ? x.cc : [],
                attachmentName: x.attachmentName || '',
                attachmentUrl: x.attachmentUrl || '',
            })),
            total,
            page,
            limit,
        };
    }
    async kpis() {
        const [total] = await Promise.all([
            this.model.countDocuments({}).exec(),
        ]);
        return { total };
    }
    async get(id) {
        const x = await this.model.findById(id).lean();
        if (!x)
            throw new common_1.NotFoundException('Memo not found');
        return { id: String(x._id), ...x };
    }
    async delete(id) {
        await this.model.findByIdAndDelete(id).exec();
        return { ok: true };
    }
};
exports.MemosService = MemosService;
exports.MemosService = MemosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(memo_schema_1.Memo.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MemosService);
//# sourceMappingURL=memos.service.js.map