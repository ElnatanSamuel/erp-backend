"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const core_module_1 = require("./modules/core/core.module");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const budget_module_1 = require("./modules/budget/budget.module");
const payroll_module_1 = require("./modules/payroll/payroll.module");
const circulars_module_1 = require("./modules/circulars/circulars.module");
const logistics_module_1 = require("./modules/logistics/logistics.module");
const memos_module_1 = require("./modules/memos/memos.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const maintenance_module_1 = require("./modules/maintenance/maintenance.module");
const trainings_module_1 = require("./modules/trainings/trainings.module");
const stocks_module_1 = require("./modules/stocks/stocks.module");
const procurement_module_1 = require("./modules/procurement/procurement.module");
const payment_voucher_module_1 = require("./modules/payment-voucher/payment-voucher.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/erp'),
            core_module_1.CoreModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            dashboard_module_1.DashboardModule,
            budget_module_1.BudgetModule,
            payroll_module_1.PayrollModule,
            circulars_module_1.CircularsModule,
            logistics_module_1.LogisticsModule,
            memos_module_1.MemosModule,
            notifications_module_1.NotificationsModule,
            maintenance_module_1.MaintenanceModule,
            trainings_module_1.TrainingsModule,
            stocks_module_1.StocksModule,
            procurement_module_1.ProcurementModule,
            payment_voucher_module_1.PaymentVoucherModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map