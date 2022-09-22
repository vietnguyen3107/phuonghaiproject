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
exports.SensorController = void 0;
const common_1 = require("@nestjs/common");
const sensor_service_1 = require("./sensor.service");
const sensor_entity_1 = require("./sensor.entity");
const user_service_1 = require("../user/user.service");
let SensorController = class SensorController {
    constructor(sensorService) {
        this.sensorService = sensorService;
    }
    findAll() {
        return this.sensorService.findAll();
    }
    get(params) {
        return this.sensorService.findOne(params.Id);
    }
    create(sensor) {
        return this.sensorService.create(sensor);
    }
    createBatch(sensors) {
        sensors.forEach(d => {
            this.sensorService.create(d);
        });
        return sensors;
    }
    update(sensor) {
        return this.sensorService.update(sensor);
    }
    deleteUser(params) {
        return this.sensorService.delete(params.Id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SensorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':Id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sensor_entity_1.Sensor]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/Batch'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "createBatch", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sensor_entity_1.Sensor]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':Id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "deleteUser", null);
SensorController = __decorate([
    (0, common_1.Controller)('Sensors'),
    __metadata("design:paramtypes", [sensor_service_1.SensorService])
], SensorController);
exports.SensorController = SensorController;
//# sourceMappingURL=sensor.controller.js.map