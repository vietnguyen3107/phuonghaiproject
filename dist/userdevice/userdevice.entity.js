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
exports.UserDevice = void 0;
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
const device_entity_1 = require("../device/device.entity");
let UserDevice = class UserDevice {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserDevice.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], UserDevice.prototype, "DeviceSerialNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], UserDevice.prototype, "DeviceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.User, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: "User_Id" }),
    __metadata("design:type", user_entity_1.User)
], UserDevice.prototype, "User", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => device_entity_1.Device, device => device.userDevices, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: "Device_Id" }),
    __metadata("design:type", device_entity_1.Device)
], UserDevice.prototype, "Device", void 0);
UserDevice = __decorate([
    (0, typeorm_1.Entity)('userdevice')
], UserDevice);
exports.UserDevice = UserDevice;
//# sourceMappingURL=userdevice.entity.js.map