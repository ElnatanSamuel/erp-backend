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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt = __importStar(require("bcryptjs"));
let UsersService = class UsersService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async findById(id) {
        return this.userModel.findById(id).exec();
    }
    async getOneById(id) {
        return this.userModel.findById(id).lean();
    }
    async createUser(data) {
        const user = new this.userModel(data);
        return user.save();
    }
    async countAll() {
        return this.userModel.countDocuments().exec();
    }
    async findMany({ q, role, page = 1, limit = 10, }) {
        const filter = {};
        if (q && q.trim()) {
            const rx = new RegExp(q.trim(), 'i');
            filter.$or = [{ name: rx }, { email: rx }];
        }
        if (role && role !== 'All') {
            filter.role = role;
        }
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            this.userModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
            this.userModel.countDocuments(filter).exec(),
        ]);
        return { items, total };
    }
    async createStaff(input) {
        const name = `${input.firstName} ${input.lastName}`.trim();
        // Generate unique staffId
        const roleCode = (input.role || 'STF')
            .slice(0, 3)
            .toUpperCase()
            .replace(/[^A-Z]/g, '') || 'STF';
        let staffId;
        for (;;) {
            const rand = Math.floor(1000 + Math.random() * 9000);
            staffId = `${rand}${roleCode}`;
            const exists = await this.userModel.findOne({ staffId }).lean();
            if (!exists)
                break;
        }
        // Generate official email
        const domain = process.env.OFFICIAL_EMAIL_DOMAIN || 'company.local';
        const base = `${input.firstName}.${input.lastName}`
            .toLowerCase()
            .replace(/\s+/g, '.')
            .replace(/[^a-z0-9.]/g, '');
        let email = `${base}@${domain}`;
        let suffix = 1;
        while (await this.userModel.findOne({ email }).lean()) {
            email = `${base}${suffix}@${domain}`;
            suffix += 1;
        }
        // Generate random password
        const rawPass = Math.random().toString(36).slice(-10);
        const passwordHash = await bcrypt.hash(rawPass, 10);
        const doc = await this.createUser({
            email,
            name,
            passwordHash,
            staffId,
            firstName: input.firstName,
            lastName: input.lastName,
            gender: input.gender,
            phone: input.phone,
            role: input.role,
            designation: input.designation,
            photoUrl: input.photoUrl,
        });
        return { user: doc, generatedEmail: email, generatedStaffId: staffId };
    }
    async updateStaff(id, input) {
        const update = {};
        for (const [k, v] of Object.entries(input)) {
            if (typeof v !== 'undefined' && v !== null && v !== '')
                update[k] = v;
        }
        if (input.firstName || input.lastName) {
            const first = input.firstName ?? undefined;
            const last = input.lastName ?? undefined;
            update.name = `${first ?? ''} ${last ?? ''}`.trim();
        }
        const doc = await this.userModel.findByIdAndUpdate(id, update, { new: true }).exec();
        return doc;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map