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
exports.StaffApplicationsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const staff_applications_service_1 = require("./staff-applications.service");
let StaffApplicationsController = class StaffApplicationsController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    async uploadFile(file) {
        if (!file) {
            throw new common_1.NotFoundException('No file uploaded');
        }
        const baseUrl = process.env.BASE_URL || 'http://localhost:4000';
        return {
            name: file.filename,
            url: `${baseUrl}/uploads/${file.filename}`,
        };
    }
    async create(body) {
        return this.svc.create(body);
    }
    async list(q, status, pageRaw, limitRaw) {
        const page = Math.max(1, Number(pageRaw) || 1);
        const limit = Math.min(50, Math.max(1, Number(limitRaw) || 10));
        return this.svc.list({ q, status, page, limit });
    }
    async get(id) {
        const x = await this.svc.get(id);
        if (!x)
            throw new common_1.NotFoundException('Application not found');
        return x;
    }
    async update(id, body) {
        return this.svc.update(id, body);
    }
    async delete(id) {
        return this.svc.delete(id);
    }
};
exports.StaffApplicationsController = StaffApplicationsController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `resume-${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StaffApplicationsController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StaffApplicationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], StaffApplicationsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffApplicationsController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StaffApplicationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffApplicationsController.prototype, "delete", null);
exports.StaffApplicationsController = StaffApplicationsController = __decorate([
    (0, common_1.Controller)('staff-applications'),
    __metadata("design:paramtypes", [staff_applications_service_1.StaffApplicationsService])
], StaffApplicationsController);
//# sourceMappingURL=staff-applications.controller.js.map