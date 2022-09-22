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
exports.DevicegroupController = void 0;
const common_1 = require("@nestjs/common");
const devicegroup_service_1 = require("./devicegroup.service");
const devicegroup_entity_1 = require("./devicegroup.entity");
let DevicegroupController = class DevicegroupController {
    constructor(devicegroupService) {
        this.devicegroupService = devicegroupService;
    }
    findAll() {
        return this.devicegroupService.findAll();
    }
    get(params) {
        return this.devicegroupService.findOne(params.Id);
    }
    create(devicegroup) {
        return this.devicegroupService.create(devicegroup);
    }
    ;
    update(devicegroup) {
        return this.devicegroupService.update(devicegroup);
    }
    deleteUser(params) {
        return this.devicegroupService.delete(params.Id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DevicegroupController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':Id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DevicegroupController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [devicegroup_entity_1.Devicegroup]),
    __metadata("design:returntype", void 0)
], DevicegroupController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [devicegroup_entity_1.Devicegroup]),
    __metadata("design:returntype", void 0)
], DevicegroupController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':Id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DevicegroupController.prototype, "deleteUser", null);
DevicegroupController = __decorate([
    (0, common_1.Controller)('DeviceGroups'),
    __metadata("design:paramtypes", [devicegroup_service_1.DevicegroupService])
], DevicegroupController);
exports.DevicegroupController = DevicegroupController;
//# sourceMappingURL=devicegroup.controller.js.map