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
exports.StockItemSchema = exports.StockItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let StockItem = class StockItem {
    name;
    productId;
    category;
    qtyPurchased;
    unitPrice;
    totalAmount;
    inStock;
    functioning; // number of functioning units for inventory view
    supplier;
    imageName;
    imageUrl;
    status;
};
exports.StockItem = StockItem;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], StockItem.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], StockItem.prototype, "productId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], StockItem.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], StockItem.prototype, "qtyPurchased", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], StockItem.prototype, "unitPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], StockItem.prototype, "totalAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], StockItem.prototype, "inStock", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], StockItem.prototype, "functioning", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], StockItem.prototype, "supplier", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], StockItem.prototype, "imageName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], StockItem.prototype, "imageUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'In stock' }),
    __metadata("design:type", String)
], StockItem.prototype, "status", void 0);
exports.StockItem = StockItem = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], StockItem);
exports.StockItemSchema = mongoose_1.SchemaFactory.createForClass(StockItem);
//# sourceMappingURL=stock.schema.js.map