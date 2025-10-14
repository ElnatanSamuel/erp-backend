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
exports.PaymentVoucherSchema = exports.PaymentVoucher = exports.PaymentVoucherItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let PaymentVoucherItem = class PaymentVoucherItem {
    sn;
    class;
    description;
    qty;
    unitPrice;
    amount;
    vatPercent;
    vatAmount;
    grossAmount;
    whtPercent;
    whtAmount;
    netAmount;
};
exports.PaymentVoucherItem = PaymentVoucherItem;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentVoucherItem.prototype, "sn", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentVoucherItem.prototype, "class", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentVoucherItem.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], PaymentVoucherItem.prototype, "qty", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], PaymentVoucherItem.prototype, "unitPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], PaymentVoucherItem.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], PaymentVoucherItem.prototype, "vatPercent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], PaymentVoucherItem.prototype, "vatAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], PaymentVoucherItem.prototype, "grossAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], PaymentVoucherItem.prototype, "whtPercent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], PaymentVoucherItem.prototype, "whtAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], PaymentVoucherItem.prototype, "netAmount", void 0);
exports.PaymentVoucherItem = PaymentVoucherItem = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PaymentVoucherItem);
let PaymentVoucher = class PaymentVoucher {
    subject;
    date;
    preparedBy;
    sendTo;
    // Line items
    items;
    // Totals
    totalUnitPrice;
    totalAmount;
    totalVatAmount;
    totalWhtAmount;
    totalNetAmount;
    // Net amount in words
    netAmountInWords;
    // Beneficiary Payment Details
    accountName;
    accountNumber;
    bankName;
    status; // Pending | Approved | Rejected
};
exports.PaymentVoucher = PaymentVoucher;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentVoucher.prototype, "subject", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: () => new Date() }),
    __metadata("design:type", Date)
], PaymentVoucher.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], PaymentVoucher.prototype, "preparedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], PaymentVoucher.prototype, "sendTo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Object], default: [] }),
    __metadata("design:type", Array)
], PaymentVoucher.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], PaymentVoucher.prototype, "totalUnitPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], PaymentVoucher.prototype, "totalAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], PaymentVoucher.prototype, "totalVatAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], PaymentVoucher.prototype, "totalWhtAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], PaymentVoucher.prototype, "totalNetAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], PaymentVoucher.prototype, "netAmountInWords", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], PaymentVoucher.prototype, "accountName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], PaymentVoucher.prototype, "accountNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], PaymentVoucher.prototype, "bankName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Pending' }),
    __metadata("design:type", String)
], PaymentVoucher.prototype, "status", void 0);
exports.PaymentVoucher = PaymentVoucher = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PaymentVoucher);
exports.PaymentVoucherSchema = mongoose_1.SchemaFactory.createForClass(PaymentVoucher);
//# sourceMappingURL=payment-voucher.schema.js.map