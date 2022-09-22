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
exports.Datum_lastest = void 0;
const typeorm_1 = require("typeorm");
let Datum_lastest = class Datum_lastest {
};
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Datum_lastest.prototype, "DeviceSerialNumber", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Datum_lastest.prototype, "SensorType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", String)
], Datum_lastest.prototype, "ReceivedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("float"),
    __metadata("design:type", Number)
], Datum_lastest.prototype, "Value", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Datum_lastest.prototype, "Unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Datum_lastest.prototype, "Status", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Datum_lastest.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Datum_lastest.prototype, "CreatedDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Datum_lastest.prototype, "UpdatedDate", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)({ type: 'int' }),
    __metadata("design:type", Object)
], Datum_lastest.prototype, "Version", void 0);
Datum_lastest = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)("unique_datumlastest", ["DeviceSerialNumber", "SensorType"])
], Datum_lastest);
exports.Datum_lastest = Datum_lastest;
//# sourceMappingURL=datum_lastest.entity.js.map