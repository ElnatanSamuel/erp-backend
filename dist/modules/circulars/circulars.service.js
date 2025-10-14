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
exports.CircularsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const circular_schema_1 = require("./schemas/circular.schema");
let CircularsService = class CircularsService {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(input) {
        if (!input.title || !String(input.title).trim())
            throw new common_1.BadRequestException('Title is required');
        const doc = new this.model({
            title: String(input.title).trim(),
            body: input.body || '',
            sentFrom: input.sentFrom || '',
            sentTo: input.sentTo || '',
            date: input.date ? new Date(input.date) : new Date(),
            type: input.type || 'Sent',
        });
        await doc.save();
        return { id: String(doc._id) };
    }
    async list({ q, type, page = 1, limit = 13 }) {
        const filter = {};
        if (q && q.trim()) {
            const rx = new RegExp(q.trim(), 'i');
            filter.$or = [
                { title: rx },
                { body: rx },
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
                type: x.type,
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
    async delete(id) {
        await this.model.findByIdAndDelete(id).exec();
        return { ok: true };
    }
};
exports.CircularsService = CircularsService;
exports.CircularsService = CircularsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(circular_schema_1.Circular.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CircularsService);
//# sourceMappingURL=circulars.service.js.map