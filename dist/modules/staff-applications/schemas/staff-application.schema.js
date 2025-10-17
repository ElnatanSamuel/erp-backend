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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffApplicationSchema = exports.StaffApplication = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let StaffApplication = class StaffApplication {
    fullName;
    email;
    phone;
    address;
    position; // Position applied for
    qualification; // Educational qualification
    experience; // Years of experience
    coverLetter;
    resumeUrl; // URL to uploaded resume
    status; // Pending | Reviewed | Accepted | Rejected
    appliedDate;
};
exports.StaffApplication = StaffApplication;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], StaffApplication.prototype, "fullName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], StaffApplication.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], StaffApplication.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], StaffApplication.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], StaffApplication.prototype, "position", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], StaffApplication.prototype, "qualification", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], StaffApplication.prototype, "experience", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], StaffApplication.prototype, "coverLetter", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], StaffApplication.prototype, "resumeUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Pending' }),
    __metadata("design:type", String)
], StaffApplication.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: () => new Date() }),
    __metadata("design:type", Date)
], StaffApplication.prototype, "appliedDate", void 0);
exports.StaffApplication = StaffApplication = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], StaffApplication);
exports.StaffApplicationSchema = mongoose_1.SchemaFactory.createForClass(StaffApplication);
//# sourceMappingURL=staff-application.schema.js.map