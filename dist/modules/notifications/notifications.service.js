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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notification_schema_1 = require("./schemas/notification.schema");
let NotificationsService = class NotificationsService {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(input) {
        const doc = new this.model({
            message: input.message || '',
            actorName: input.actorName || '',
            actorPhotoUrl: input.actorPhotoUrl || '',
            read: !!input.read,
            userId: input.userId || '',
        });
        await doc.save();
        return { id: String(doc._id) };
    }
    async list({ page = 1, limit = 20, userId }) {
        const filter = {};
        if (userId)
            filter.userId = userId;
        const skip = (page - 1) * limit;
        const [items, total, unreadCount] = await Promise.all([
            this.model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            this.model.countDocuments(filter),
            this.model.countDocuments({ ...filter, read: false }),
        ]);
        return {
            items: items.map((x) => ({
                id: String(x._id),
                message: x.message,
                actorName: x.actorName,
                actorPhotoUrl: x.actorPhotoUrl,
                read: !!x.read,
                createdAt: x.createdAt,
            })),
            total,
            unreadCount,
            page,
            limit,
        };
    }
    async markAllRead(userId) {
        const filter = userId ? { userId, read: false } : { read: false };
        await this.model.updateMany(filter, { $set: { read: true } });
        return { ok: true };
    }
    async markRead(id) {
        await this.model.findByIdAndUpdate(id, { $set: { read: true } });
        return { ok: true };
    }
    async delete(id) {
        await this.model.findByIdAndDelete(id);
        return { ok: true };
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map