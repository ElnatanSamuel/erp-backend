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
exports.TrainingSchema = exports.Training = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Training = class Training {
    description;
    trainingType; // Team, Individual
    duration; // e.g., 3days, 2weeks
    mode; // Physical, Online
    date;
    staff; // names
    status;
};
exports.Training = Training;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Training.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Training.prototype, "trainingType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Training.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Training.prototype, "mode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], Training.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Training.prototype, "staff", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'To-do' }),
    __metadata("design:type", String)
], Training.prototype, "status", void 0);
exports.Training = Training = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Training);
exports.TrainingSchema = mongoose_1.SchemaFactory.createForClass(Training);
//# sourceMappingURL=training.schema.js.map