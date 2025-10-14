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
exports.ProcurementSchema = exports.Procurement = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Procurement = class Procurement {
    itemName;
    quantity;
    unitPrice;
    totalPrice;
    requestedBy;
    sentTo;
    date;
    status; // Pending | Approved | Rejected | Draft
    // Attachment details
    addAttachment;
    attachmentType;
    hasAttachment; // Yes | No
    // Payment Voucher details
    vatPercent;
    vatAmount;
    grossAmount;
    // Beneficiary Payment Details
    accountName;
    accountNumber;
    bankName;
    // Memo Activities
    initiatedBy;
    verifiedBy;
    approvedBy;
    // Signatures
    verifierSignature;
    authorizerSignature;
};
exports.Procurement = Procurement;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Procurement.prototype, "itemName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 1 }),
    __metadata("design:type", Number)
], Procurement.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Procurement.prototype, "unitPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Procurement.prototype, "totalPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Procurement.prototype, "requestedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Procurement.prototype, "sentTo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: () => new Date() }),
    __metadata("design:type", Date)
], Procurement.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Pending' }),
    __metadata("design:type", String)
], Procurement.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Procurement.prototype, "addAttachment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Procurement.prototype, "attachmentType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'No' }),
    __metadata("design:type", String)
], Procurement.prototype, "hasAttachment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Procurement.prototype, "vatPercent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Procurement.prototype, "vatAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Procurement.prototype, "grossAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Procurement.prototype, "accountName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Procurement.prototype, "accountNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Procurement.prototype, "bankName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Procurement.prototype, "initiatedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Procurement.prototype, "verifiedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Procurement.prototype, "approvedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Procurement.prototype, "verifierSignature", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Procurement.prototype, "authorizerSignature", void 0);
exports.Procurement = Procurement = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Procurement);
exports.ProcurementSchema = mongoose_1.SchemaFactory.createForClass(Procurement);
//# sourceMappingURL=procurement.schema.js.map