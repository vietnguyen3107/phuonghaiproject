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
exports.UserdeviceController = void 0;
const common_1 = require("@nestjs/common");
const userdevice_service_1 = require("./userdevice.service");
const userdevice_entity_1 = require("./userdevice.entity");
const typeorm_1 = require("typeorm");
let UserdeviceController = class UserdeviceController {
    constructor(userdeviceService) {
        this.userdeviceService = userdeviceService;
    }
    create(userDevice) {
        return this.userdeviceService.create(userDevice);
    }
    async create2(userDevices) {
        try {
            let userDevice0 = userDevices[0];
            const entityManager = (0, typeorm_1.getManager)();
            let sql = `delete from userdevice where User_Id=${userDevice0.User.Id}`;
            let rawData = await entityManager.query(sql);
            for (const ud of userDevices) {
                this.userdeviceService.create(ud);
            }
            return { "Status": "OK" };
        }
        catch (e) {
            return { "Error": e.message };
        }
    }
    findOne(params) {
        return this.userdeviceService.findOne(params.Id);
    }
    async filter(deviceSerialNumber) {
        return this.userdeviceService.getAllUserDevicesByDevice(deviceSerialNumber);
    }
    remove(params) {
        return this.userdeviceService.remove(params.id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userdevice_entity_1.UserDevice]),
    __metadata("design:returntype", void 0)
], UserdeviceController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/Assign'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UserdeviceController.prototype, "create2", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserdeviceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/UserDeviceByDevice'),
    __param(0, (0, common_1.Query)('DeviceSerialNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserdeviceController.prototype, "filter", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserdeviceController.prototype, "remove", null);
UserdeviceController = __decorate([
    (0, common_1.Controller)('UserDevices'),
    __metadata("design:paramtypes", [userdevice_service_1.UserDeviceService])
], UserdeviceController);
exports.UserdeviceController = UserdeviceController;
//# sourceMappingURL=userdevice.controller.js.map