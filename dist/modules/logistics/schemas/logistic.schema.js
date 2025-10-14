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
exports.LogisticSchema = exports.Logistic = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Logistic = class Logistic {
    title;
    purpose; // e.g., Training course, Vacation
    amount;
    requestedBy; // requester name
    sentTo; // recipient/approver
    date;
    status; // Pending | Approved | Rejected
    // Extra fields for request details
    dateFrom;
    dateTo;
    voucherName; // uploaded filename or reference
    accountName;
    accountNumber;
    bankName;
    verifierSignature;
    authorizerSignature;
};
exports.Logistic = Logistic;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Logistic.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Logistic.prototype, "purpose", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Logistic.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Logistic.prototype, "requestedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Logistic.prototype, "sentTo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: () => new Date() }),
    __metadata("design:type", Date)
], Logistic.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Pending' }),
    __metadata("design:type", String)
], Logistic.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Logistic.prototype, "dateFrom", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Logistic.prototype, "dateTo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Logistic.prototype, "voucherName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Logistic.prototype, "accountName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Logistic.prototype, "accountNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Logistic.prototype, "bankName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Logistic.prototype, "verifierSignature", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Logistic.prototype, "authorizerSignature", void 0);
exports.Logistic = Logistic = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Logistic);
exports.LogisticSchema = mongoose_1.SchemaFactory.createForClass(Logistic);
//# sourceMappingURL=logistic.schema.js.map