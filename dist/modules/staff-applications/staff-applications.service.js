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
exports.StaffApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const staff_application_schema_1 = require("./schemas/staff-application.schema");
let StaffApplicationsService = class StaffApplicationsService {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(input) {
        if (!input.fullName || !String(input.fullName).trim()) {
            throw new common_1.BadRequestException('Full name is required');
        }
        if (!input.email || !String(input.email).trim()) {
            throw new common_1.BadRequestException('Email is required');
        }
        if (!input.phone || !String(input.phone).trim()) {
            throw new common_1.BadRequestException('Phone is required');
        }
        const doc = new this.model({
            fullName: String(input.fullName).trim(),
            email: String(input.email).trim(),
            phone: String(input.phone).trim(),
            address: input.address || '',
            position: input.position || '',
            qualification: input.qualification || '',
            experience: input.experience || '',
            coverLetter: input.coverLetter || '',
            resumeUrl: input.resumeUrl || '',
            status: 'Pending',
            appliedDate: new Date(),
        });
        await doc.save();
        return { id: String(doc._id) };
    }
    async list({ q, status, page = 1, limit = 10 }) {
        const filter = {};
        if (q && q.trim()) {
            const rx = new RegExp(q.trim(), 'i');
            filter.$or = [
                { fullName: rx },
                { email: rx },
                { position: rx },
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
                fullName: x.fullName,
                email: x.email,
                phone: x.phone,
                position: x.position,
                status: x.status,
                appliedDate: x.appliedDate,
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
        const doc = await this.model.findByIdAndUpdate(id, update, { new: true }).lean();
        if (!doc)
            throw new common_1.BadRequestException('Application not found');
        return { id: String(doc._id), ...doc };
    }
    async delete(id) {
        await this.model.findByIdAndDelete(id).exec();
        return { ok: true };
    }
    async countAll() {
        return this.model.countDocuments().exec();
    }
    async getStats() {
        const [pending, reviewed, accepted, rejected] = await Promise.all([
            this.model.countDocuments({ status: 'Pending' }).exec(),
            this.model.countDocuments({ status: 'Reviewed' }).exec(),
            this.model.countDocuments({ status: 'Accepted' }).exec(),
            this.model.countDocuments({ status: 'Rejected' }).exec(),
        ]);
        return { pending, reviewed, approved: accepted, rejected };
    }
};
exports.StaffApplicationsService = StaffApplicationsService;
exports.StaffApplicationsService = StaffApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(staff_application_schema_1.StaffApplication.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StaffApplicationsService);
//# sourceMappingURL=staff-applications.service.js.map