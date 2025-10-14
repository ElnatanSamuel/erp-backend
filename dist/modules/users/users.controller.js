"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const platform_express_1 = require("@nestjs/platform-express");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const multer_1 = require("multer");
let UsersController = class UsersController {
    users;
    constructor(users) {
        this.users = users;
    }
    async list(q, role, pageRaw, limitRaw) {
        const page = Math.max(1, Number(pageRaw) || 1);
        const limit = Math.min(100, Math.max(1, Number(limitRaw) || 10));
        const { items, total } = await this.users.findMany({ q, role, page, limit });
        return {
            items: items.map((u) => ({
                id: u._id,
                name: u.name,
                email: u.email,
                staffId: u.staffId,
                firstName: u.firstName,
                lastName: u.lastName,
                gender: u.gender,
                phone: u.phone,
                role: u.role,
                designation: u.designation,
                photoUrl: u.photoUrl,
            })),
            total,
            page,
            limit,
        };
    }
    async create(file, body) {
        let photoUrl = undefined;
        if (file && (file.buffer || file.path)) {
            const uploadsDir = path.join(process.cwd(), 'uploads');
            if (!fs.existsSync(uploadsDir))
                fs.mkdirSync(uploadsDir, { recursive: true });
            const safeName = (file.originalname || 'photo').replace(/[^a-zA-Z0-9.\-_]/g, '_');
            const filename = `${Date.now()}_${safeName}`;
            const filePath = path.join(uploadsDir, filename);
            if (file.buffer) {
                fs.writeFileSync(filePath, file.buffer);
            }
            else if (file.path) {
                fs.copyFileSync(file.path, filePath);
            }
            photoUrl = `/api/users/photo/${filename}`;
        }
        const result = await this.users.createStaff({ ...body, photoUrl });
        return {
            id: result.user._id,
            staffId: result.generatedStaffId,
            email: result.generatedEmail,
            name: result.user.name,
            photoUrl: result.user.photoUrl,
        };
    }
    async servePhoto(filename, res) {
        const filePath = path.join(process.cwd(), 'uploads', filename);
        if (!fs.existsSync(filePath)) {
            res.status(404).send('Not found');
            return;
        }
        res.sendFile(filePath);
    }
    async getOne(id) {
        const u = await this.users.getOneById(id);
        if (!u)
            return { error: 'Not found' };
        return {
            id: u._id,
            name: u.name,
            email: u.email,
            staffId: u.staffId,
            firstName: u.firstName,
            lastName: u.lastName,
            gender: u.gender,
            phone: u.phone,
            role: u.role,
            designation: u.designation,
            photoUrl: u.photoUrl,
        };
    }
    async update(id, file, body) {
        let photoUrl = undefined;
        if (file && (file.buffer || file.path)) {
            const uploadsDir = path.join(process.cwd(), 'uploads');
            if (!fs.existsSync(uploadsDir))
                fs.mkdirSync(uploadsDir, { recursive: true });
            const safeName = (file.originalname || 'photo').replace(/[^a-zA-Z0-9.\-_]/g, '_');
            const filename = `${Date.now()}_${safeName}`;
            const filePath = path.join(uploadsDir, filename);
            if (file.buffer)
                fs.writeFileSync(filePath, file.buffer);
            else if (file.path)
                fs.copyFileSync(file.path, filePath);
            photoUrl = `/api/users/photo/${filename}`;
        }
        const updated = await this.users.updateStaff(id, { ...body, photoUrl });
        return {
            id: updated?._id,
            name: updated?.name,
            email: updated?.email,
            staffId: updated?.staffId,
            firstName: updated?.firstName,
            lastName: updated?.lastName,
            gender: updated?.gender,
            phone: updated?.phone,
            role: updated?.role,
            designation: updated?.designation,
            photoUrl: updated?.photoUrl,
        };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('role')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('photo/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "servePhoto", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getOne", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo', { storage: (0, multer_1.memoryStorage)() })),
    (0, common_1.Post)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map