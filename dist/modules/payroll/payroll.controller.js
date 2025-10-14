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
exports.PayrollController = void 0;
const common_1 = require("@nestjs/common");
const payroll_service_1 = require("./payroll.service");
let PayrollController = class PayrollController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    async kpis() {
        return this.svc.kpis();
    }
    async summary() {
        return this.svc.summary();
    }
    async createDefinition(body) {
        return this.svc.createDefinition(body);
    }
    async listDefinitions(page, limit) {
        const p = page ? parseInt(page, 10) : 1;
        const l = limit ? parseInt(limit, 10) : 50;
        return this.svc.listDefinitions({ page: p, limit: l });
    }
    async getDefinition(id) {
        const item = await this.svc.getDefinition(id);
        if (!item)
            throw new common_1.NotFoundException('Salary definition not found');
        return item;
    }
    async updateDefinition(id, body) {
        return this.svc.updateDefinition(id, body);
    }
    async deleteDefinition(id) {
        return this.svc.deleteDefinition(id);
    }
    // ---- Tax Definitions ----
    async createTax(body) {
        return this.svc.createTaxDefinition(body);
    }
    async listTaxes(page, limit) {
        const p = page ? parseInt(page, 10) : 1;
        const l = limit ? parseInt(limit, 10) : 50;
        return this.svc.listTaxDefinitions({ page: p, limit: l });
    }
    async getTax(id) {
        const item = await this.svc.getTaxDefinition(id);
        if (!item)
            throw new common_1.NotFoundException('Tax definition not found');
        return item;
    }
    async updateTax(id, body) {
        return this.svc.updateTaxDefinition(id, body);
    }
    async deleteTax(id) {
        return this.svc.deleteTaxDefinition(id);
    }
    // ---- Payslips ----
    async createPayslip(body) {
        return this.svc.createPayslip(body);
    }
    async listPayslips(page, limit) {
        const p = page ? parseInt(page, 10) : 1;
        const l = limit ? parseInt(limit, 10) : 50;
        return this.svc.listPayslips({ page: p, limit: l });
    }
    async getPayslip(id) {
        const item = await this.svc.getPayslip(id);
        if (!item)
            throw new common_1.NotFoundException('Payslip not found');
        return item;
    }
    async updatePayslip(id, body) {
        return this.svc.updatePayslip(id, body);
    }
    async deletePayslip(id) {
        return this.svc.deletePayslip(id);
    }
    async createPayslipsBatch(body) {
        const items = Array.isArray(body?.items) ? body.items : [];
        const date = body?.date;
        return this.svc.createPayslipsBatch(items, date);
    }
};
exports.PayrollController = PayrollController;
__decorate([
    (0, common_1.Get)('kpis'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "kpis", null);
__decorate([
    (0, common_1.Get)('summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "summary", null);
__decorate([
    (0, common_1.Post)('definitions'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "createDefinition", null);
__decorate([
    (0, common_1.Get)('definitions'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "listDefinitions", null);
__decorate([
    (0, common_1.Get)('definitions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "getDefinition", null);
__decorate([
    (0, common_1.Put)('definitions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "updateDefinition", null);
__decorate([
    (0, common_1.Delete)('definitions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "deleteDefinition", null);
__decorate([
    (0, common_1.Post)('taxes'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "createTax", null);
__decorate([
    (0, common_1.Get)('taxes'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "listTaxes", null);
__decorate([
    (0, common_1.Get)('taxes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "getTax", null);
__decorate([
    (0, common_1.Put)('taxes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "updateTax", null);
__decorate([
    (0, common_1.Delete)('taxes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "deleteTax", null);
__decorate([
    (0, common_1.Post)('payslips'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "createPayslip", null);
__decorate([
    (0, common_1.Get)('payslips'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "listPayslips", null);
__decorate([
    (0, common_1.Get)('payslips/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "getPayslip", null);
__decorate([
    (0, common_1.Put)('payslips/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "updatePayslip", null);
__decorate([
    (0, common_1.Delete)('payslips/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "deletePayslip", null);
__decorate([
    (0, common_1.Post)('payslips/batch'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "createPayslipsBatch", null);
exports.PayrollController = PayrollController = __decorate([
    (0, common_1.Controller)('payroll'),
    __metadata("design:paramtypes", [payroll_service_1.PayrollService])
], PayrollController);
//# sourceMappingURL=payroll.controller.js.map