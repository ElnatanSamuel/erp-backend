"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffApplicationsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const staff_applications_controller_1 = require("./staff-applications.controller");
const staff_applications_service_1 = require("./staff-applications.service");
const staff_application_schema_1 = require("./schemas/staff-application.schema");
let StaffApplicationsModule = class StaffApplicationsModule {
};
exports.StaffApplicationsModule = StaffApplicationsModule;
exports.StaffApplicationsModule = StaffApplicationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: staff_application_schema_1.StaffApplication.name, schema: staff_application_schema_1.StaffApplicationSchema },
            ]),
        ],
        controllers: [staff_applications_controller_1.StaffApplicationsController],
        providers: [staff_applications_service_1.StaffApplicationsService],
        exports: [staff_applications_service_1.StaffApplicationsService],
    })
], StaffApplicationsModule);
//# sourceMappingURL=staff-applications.module.js.map