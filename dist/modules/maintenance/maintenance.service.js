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
exports.MaintenanceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const maintenance_schema_1 = require("./schemas/maintenance.schema");
let MaintenanceService = class MaintenanceService {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(input) {
        if (!input.date)
            throw new common_1.BadRequestException('Date is required');
        const date = new Date(input.date);
        if (isNaN(date.getTime()))
            throw new common_1.BadRequestException('Invalid date');
        const autoTitle = (() => {
            const t = `${input.maintenanceType || 'Maintenance'} for ${input.itemName || ''}${input.itemNumber ? ' ' + input.itemNumber : ''}`.trim();
            return t.replace(/\s+/g, ' ');
        })();
        const title = (input.title && String(input.title).trim()) || autoTitle;
        if (!title)
            throw new common_1.BadRequestException('Title is required');
        const doc = new this.model({
            title,
            description: input.description || '',
            status: input.status || 'Scheduled',
            date,
            itemName: input.itemName || '',
            itemNumber: input.itemNumber || '',
            maintenanceType: input.maintenanceType || '',
            recurringOption: input.recurringOption || '',
        });
        await doc.save();
        return { id: String(doc._id) };
    }
    async list({ month, year }) {
        let filter = {};
        if (typeof month === 'number' && typeof year === 'number') {
            const start = new Date(year, month, 1, 0, 0, 0, 0);
            const end = new Date(year, month + 1, 1, 0, 0, 0, 0);
            filter.date = { $gte: start, $lt: end };
        }
        const items = await this.model.find(filter).sort({ date: 1 }).lean();
        return {
            items: items.map((x) => ({
                id: String(x._id),
                title: x.title,
                description: x.description,
                status: x.status,
                date: x.date,
                itemName: x.itemName,
                itemNumber: x.itemNumber,
                maintenanceType: x.maintenanceType,
                recurringOption: x.recurringOption,
            })),
        };
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
    async updateAttachment(id, name, url) {
        await this.model.findByIdAndUpdate(id, { $set: { attachmentName: name, attachmentUrl: url } }).exec();
        return { ok: true };
    }
    async kpis() {
        const [scheduled, completed, pending, overdue] = await Promise.all([
            this.model.countDocuments({ status: 'Scheduled' }),
            this.model.countDocuments({ status: 'Completed' }),
            this.model.countDocuments({ status: 'Pending' }),
            this.model.countDocuments({ status: 'Overdue' }),
        ]);
        return { scheduled, completed, pending, overdue };
    }
};
exports.MaintenanceService = MaintenanceService;
exports.MaintenanceService = MaintenanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(maintenance_schema_1.Maintenance.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MaintenanceService);
//# sourceMappingURL=maintenance.service.js.map