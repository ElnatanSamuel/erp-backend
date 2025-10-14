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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const memos_service_1 = require("../memos/memos.service");
const payment_voucher_service_1 = require("../payment-voucher/payment-voucher.service");
let DashboardService = class DashboardService {
    users;
    memos;
    paymentVouchers;
    constructor(users, memos, paymentVouchers) {
        this.users = users;
        this.memos = memos;
        this.paymentVouchers = paymentVouchers;
    }
    async summary() {
        const [staffCount, memoData, paymentData, recent] = await Promise.all([
            this.users.countAll(),
            this.memos.list({ page: 1, limit: 5 }),
            this.paymentVouchers.list({ page: 1, limit: 5 }),
            this.users.findMany({ page: 1, limit: 8 }),
        ]);
        const memos = memoData.items.map((m) => ({
            sn: m.id.substring(0, 8),
            subject: m.title,
            date: m.date,
            from: m.sentFrom,
            to: m.sentTo,
        }));
        const payments = paymentData.items.map((p) => ({
            sn: p.id.substring(0, 8),
            subject: p.subject,
            date: p.date,
            preparedBy: p.preparedBy,
            sendTo: p.sendTo,
        }));
        const staff = recent.items.map((u, idx) => ({
            sn: String(idx + 1).padStart(2, '0'),
            name: u.name,
            role: u.role || '-',
            designation: u.designation || '-',
            photoUrl: u.photoUrl,
        }));
        return {
            stats: {
                staffCount,
                applicationCount: 0,
                projectsCount: 0,
                departmentsCount: 0,
                trendStaff: '+0%',
                trendApplications: '+0%',
                trendProjects: '+0%',
            },
            memos,
            payments,
            staff,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        memos_service_1.MemosService,
        payment_voucher_service_1.PaymentVoucherService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map