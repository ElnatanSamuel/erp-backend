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
exports.CircularSchema = exports.Circular = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Circular = class Circular {
    title;
    body;
    sentFrom; // e.g., Admin, HR
    sentTo; // e.g., Operations Staffs
    date;
    type; // 'Sent' | 'Received'
};
exports.Circular = Circular;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Circular.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Circular.prototype, "body", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Circular.prototype, "sentFrom", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Circular.prototype, "sentTo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: () => new Date() }),
    __metadata("design:type", Date)
], Circular.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Sent' }),
    __metadata("design:type", String)
], Circular.prototype, "type", void 0);
exports.Circular = Circular = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Circular);
exports.CircularSchema = mongoose_1.SchemaFactory.createForClass(Circular);
//# sourceMappingURL=circular.schema.js.map