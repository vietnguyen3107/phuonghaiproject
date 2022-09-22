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
exports.UserDeviceService = void 0;
const common_1 = require("@nestjs/common");
const userdevice_entity_1 = require("./userdevice.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
let UserDeviceService = class UserDeviceService {
    constructor(userDeviceRepo) {
        this.userDeviceRepo = userDeviceRepo;
    }
    async findAll() {
        return await this.userDeviceRepo.find();
    }
    findOne(id) {
        return this.userDeviceRepo.findOne(id);
    }
    remove(id) {
        return `This action removes a #${id} userdevice`;
    }
    async create(userDevice) {
        return await this.userDeviceRepo.save(userDevice);
    }
    async getAllUserDevicesByDevice(deviceSerialNumber) {
        const entityManager = (0, typeorm_2.getManager)();
        let sql = '';
        if (deviceSerialNumber !== 'All') {
            sql = `select * from userdevice 
    where DeviceSerialNumber='${deviceSerialNumber}' 
      `;
        }
        const rawData = entityManager.query(sql);
        return rawData;
    }
};
UserDeviceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(userdevice_entity_1.UserDevice)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserDeviceService);
exports.UserDeviceService = UserDeviceService;
//# sourceMappingURL=userdevice.service.js.map