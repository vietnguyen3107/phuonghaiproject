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
exports.Sensor = void 0;
const datum_entity_1 = require("../datum/datum.entity");
const device_entity_1 = require("../device/device.entity");
const typeorm_1 = require("typeorm");
let Sensor = class Sensor {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sensor.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Sensor.prototype, "Measure", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sensor.prototype, "Status", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Sensor.prototype, "SensorType", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Sensor.prototype, "DeviceSerialNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => device_entity_1.Device, Device => Device.Id, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: "Device_Id", referencedColumnName: "Id" }),
    __metadata("design:type", device_entity_1.Device)
], Sensor.prototype, "Device", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => datum_entity_1.Datum),
    __metadata("design:type", datum_entity_1.Datum)
], Sensor.prototype, "LatestDatum", void 0);
Sensor = __decorate([
    (0, typeorm_1.Entity)()
], Sensor);
exports.Sensor = Sensor;
//# sourceMappingURL=sensor.entity.js.map