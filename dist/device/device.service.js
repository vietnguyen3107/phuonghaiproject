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
exports.DeviceService = void 0;
const common_1 = require("@nestjs/common");
const device_entity_1 = require("./device.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let DeviceService = class DeviceService {
    constructor(deviceRepo) {
        this.deviceRepo = deviceRepo;
    }
    async findAll() {
        return await this.deviceRepo.find();
    }
    async findDevicesByUser(userId) {
        const entityManager = (0, typeorm_2.getManager)();
        const sql = `select device.* from device 
     inner join userdevice where device.Id=userdevice.Device_Id
     and userdevice.User_Id=${userId}`;
        const rawData = entityManager.query(sql);
        return rawData;
    }
    async findOne(Id) {
        return await this.deviceRepo.findOne(Id);
    }
    async create(task) {
        return await this.deviceRepo.save(task);
    }
    async update(task) {
        return await this.deviceRepo.update(task.Id, task);
    }
    async delete(Id) {
        return await this.deviceRepo.delete(Id);
    }
    async findOneBySerialNumber(SerialNumber) {
        return await this.deviceRepo.findOne({ SerialNumber: SerialNumber });
    }
};
DeviceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(device_entity_1.Device)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DeviceService);
exports.DeviceService = DeviceService;
//# sourceMappingURL=device.service.js.map