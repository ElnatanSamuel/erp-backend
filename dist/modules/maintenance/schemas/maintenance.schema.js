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
exports.MaintenanceSchema = exports.Maintenance = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Maintenance = class Maintenance {
    title;
    date; // scheduled date
    status;
    description;
    itemName;
    itemNumber;
    maintenanceType;
    recurringOption;
    attachmentName;
    attachmentUrl;
};
exports.Maintenance = Maintenance;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Maintenance.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], Maintenance.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Scheduled' }),
    __metadata("design:type", String)
], Maintenance.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Maintenance.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Maintenance.prototype, "itemName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Maintenance.prototype, "itemNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Maintenance.prototype, "maintenanceType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Maintenance.prototype, "recurringOption", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Maintenance.prototype, "attachmentName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Maintenance.prototype, "attachmentUrl", void 0);
exports.Maintenance = Maintenance = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Maintenance);
exports.MaintenanceSchema = mongoose_1.SchemaFactory.createForClass(Maintenance);
//# sourceMappingURL=maintenance.schema.js.map