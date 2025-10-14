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
exports.TrainingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const training_schema_1 = require("./schemas/training.schema");
let TrainingsService = class TrainingsService {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(input) {
        if (!input.description || !String(input.description).trim())
            throw new common_1.BadRequestException('Description is required');
        if (!input.date)
            throw new common_1.BadRequestException('Date is required');
        const date = new Date(input.date);
        if (isNaN(date.getTime()))
            throw new common_1.BadRequestException('Invalid date');
        const doc = new this.model({
            description: String(input.description).trim(),
            trainingType: input.trainingType || '',
            duration: input.duration || '',
            mode: input.mode || '',
            staff: Array.isArray(input.staff) ? input.staff : [],
            date,
            status: input.status || 'To-do',
        });
        await doc.save();
        return { id: String(doc._id) };
    }
    async list({ q, page = 1, limit = 20 }) {
        const filter = {};
        if (q && q.trim()) {
            const rx = new RegExp(q.trim(), 'i');
            filter.$or = [{ description: rx }, { trainingType: rx }, { mode: rx }, { duration: rx }];
        }
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            this.model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            this.model.countDocuments(filter),
        ]);
        return {
            items: items.map((x) => ({
                id: String(x._id),
                description: x.description,
                trainingType: x.trainingType,
                duration: x.duration,
                mode: x.mode,
                date: x.date,
                staff: x.staff,
                status: x.status,
            })),
            total,
            page,
            limit,
        };
    }
    async kpis() {
        const [totalReq, totalDone, docs] = await Promise.all([
            this.model.countDocuments({}),
            this.model.countDocuments({ status: 'Completed' }),
            this.model.find({}).select('staff status').lean(),
        ]);
        const totalStaffTrained = docs.filter((d) => d.status === 'Completed').reduce((sum, d) => sum + (Array.isArray(d.staff) ? d.staff.length : 0), 0);
        const rate = totalReq > 0 ? Math.round((totalDone / totalReq) * 100) : 0;
        return { totalRequests: totalReq, totalStaffTrained, totalTrainingDone: totalDone, trainingRatePct: rate };
    }
    async get(id) {
        const x = await this.model.findById(id).lean();
        if (!x)
            return null;
        return { id: String(x._id), ...x };
    }
    async setStatus(id, status) {
        await this.model.findByIdAndUpdate(id, { $set: { status } }).exec();
        return { ok: true };
    }
};
exports.TrainingsService = TrainingsService;
exports.TrainingsService = TrainingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(training_schema_1.Training.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TrainingsService);
//# sourceMappingURL=trainings.service.js.map