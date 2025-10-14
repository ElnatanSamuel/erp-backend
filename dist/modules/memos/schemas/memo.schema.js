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
exports.MemoSchema = exports.Memo = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Memo = class Memo {
    title;
    sentFrom;
    sentTo;
    date;
    hasAttachment; // true => Yes on table
    type;
    action;
    attachmentType;
    body;
    cc;
    attachmentName;
    attachmentUrl;
};
exports.Memo = Memo;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Memo.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Memo.prototype, "sentFrom", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Memo.prototype, "sentTo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: () => new Date() }),
    __metadata("design:type", Date)
], Memo.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Memo.prototype, "hasAttachment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Sent' }),
    __metadata("design:type", String)
], Memo.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Memo.prototype, "action", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Memo.prototype, "attachmentType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Memo.prototype, "body", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Memo.prototype, "cc", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Memo.prototype, "attachmentName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Memo.prototype, "attachmentUrl", void 0);
exports.Memo = Memo = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Memo);
exports.MemoSchema = mongoose_1.SchemaFactory.createForClass(Memo);
//# sourceMappingURL=memo.schema.js.map