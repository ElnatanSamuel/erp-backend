"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentVoucherModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const payment_voucher_service_1 = require("./payment-voucher.service");
const payment_voucher_controller_1 = require("./payment-voucher.controller");
const payment_voucher_schema_1 = require("./schemas/payment-voucher.schema");
let PaymentVoucherModule = class PaymentVoucherModule {
};
exports.PaymentVoucherModule = PaymentVoucherModule;
exports.PaymentVoucherModule = PaymentVoucherModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: payment_voucher_schema_1.PaymentVoucher.name, schema: payment_voucher_schema_1.PaymentVoucherSchema },
            ]),
        ],
        controllers: [payment_voucher_controller_1.PaymentVoucherController],
        providers: [payment_voucher_service_1.PaymentVoucherService],
        exports: [payment_voucher_service_1.PaymentVoucherService],
    })
], PaymentVoucherModule);
//# sourceMappingURL=payment-voucher.module.js.map