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
exports.PaymentVoucherController = void 0;
const common_1 = require("@nestjs/common");
const payment_voucher_service_1 = require("./payment-voucher.service");
let PaymentVoucherController = class PaymentVoucherController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    async create(body) {
        return this.svc.create(body);
    }
    async list(q, pageRaw, limitRaw) {
        const page = Math.max(1, Number(pageRaw) || 1);
        const limit = Math.min(50, Math.max(1, Number(limitRaw) || 16));
        return this.svc.list({ q, page, limit });
    }
    async count() {
        const total = await this.svc.count();
        return { total };
    }
    async get(id) {
        const x = await this.svc.get(id);
        if (!x)
            throw new common_1.NotFoundException('Payment voucher not found');
        return x;
    }
    async update(id, body) {
        return this.svc.update(id, body);
    }
    async delete(id) {
        return this.svc.delete(id);
    }
};
exports.PaymentVoucherController = PaymentVoucherController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentVoucherController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PaymentVoucherController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentVoucherController.prototype, "count", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentVoucherController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentVoucherController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentVoucherController.prototype, "delete", null);
exports.PaymentVoucherController = PaymentVoucherController = __decorate([
    (0, common_1.Controller)('payment-voucher'),
    __metadata("design:paramtypes", [payment_voucher_service_1.PaymentVoucherService])
], PaymentVoucherController);
//# sourceMappingURL=payment-voucher.controller.js.map