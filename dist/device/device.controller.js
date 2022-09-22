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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceController = void 0;
const common_1 = require("@nestjs/common");
const device_service_1 = require("./device.service");
const device_entity_1 = require("./device.entity");
const sensor_entity_1 = require("../sensor/sensor.entity");
const basic_auth_middleware_1 = require("../user/basic.auth.middleware");
let DeviceController = class DeviceController {
    constructor(deviceService) {
        this.deviceService = deviceService;
    }
    search(SerialNumber) {
        return this.deviceService.findOneBySerialNumber(SerialNumber);
    }
    findAll(request) {
        return this.deviceService.findAll();
    }
    findDevicesByUser(request) {
        return this.deviceService.findDevicesByUser(request.user.Id);
    }
    get(params) {
        return this.deviceService.findOne(params.Id);
    }
    create(lab) {
        return this.deviceService.create(lab);
    }
    update(lab) {
        return this.deviceService.update(lab);
    }
    deleteUser(params) {
        return this.deviceService.delete(params.Id);
    }
};
__decorate([
    (0, common_1.Get)('/Search?'),
    __param(0, (0, common_1.Query)('SerialNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/ByUser'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "findDevicesByUser", null);
__decorate([
    (0, common_1.Get)(':Id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [device_entity_1.Device]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [device_entity_1.Device]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':Id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "deleteUser", null);
DeviceController = __decorate([
    (0, common_1.Controller)('Devices'),
    __metadata("design:paramtypes", [device_service_1.DeviceService])
], DeviceController);
exports.DeviceController = DeviceController;
//# sourceMappingURL=device.controller.js.map