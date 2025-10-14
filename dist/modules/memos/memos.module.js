"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemosModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const memos_controller_1 = require("./memos.controller");
const memos_service_1 = require("./memos.service");
const memo_schema_1 = require("./schemas/memo.schema");
let MemosModule = class MemosModule {
};
exports.MemosModule = MemosModule;
exports.MemosModule = MemosModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: memo_schema_1.Memo.name, schema: memo_schema_1.MemoSchema }])],
        controllers: [memos_controller_1.MemosController],
        providers: [memos_service_1.MemosService],
        exports: [memos_service_1.MemosService],
    })
], MemosModule);
//# sourceMappingURL=memos.module.js.map