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
exports.Device = void 0;
const devicegroup_entity_1 = require("../devicegroup/devicegroup.entity");
const lab_entity_1 = require("../lab/lab.entity");
const sensor_entity_1 = require("../sensor/sensor.entity");
const userdevice_entity_1 = require("../userdevice/userdevice.entity");
const typeorm_1 = require("typeorm");
let Device = class Device {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Device.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", String)
], Device.prototype, "DateSync", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Device.prototype, "Description", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Device.prototype, "FriendlyName", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Device.prototype, "Model", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Device.prototype, "SerialNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Device.prototype, "Type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => devicegroup_entity_1.Devicegroup, Devicegroup => Devicegroup.Id, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "Devicegroup_Id2" }),
    __metadata("design:type", devicegroup_entity_1.Devicegroup)
], Device.prototype, "Devicegroup", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => sensor_entity_1.Sensor, Sensor => Sensor.Device, { eager: true }),
    __metadata("design:type", Array)
], Device.prototype, "Sensors", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Device.prototype, "LabSerialNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Device.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userdevice_entity_1.UserDevice, userDevice => userDevice.Id),
    __metadata("design:type", Array)
], Device.prototype, "userDevices", void 0);
Device = __decorate([
    (0, typeorm_1.Entity)('device')
], Device);
exports.Device = Device;
//# sourceMappingURL=device.entity.js.map