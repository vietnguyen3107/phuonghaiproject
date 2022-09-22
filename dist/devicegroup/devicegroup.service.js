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
exports.DevicegroupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const devicegroup_entity_1 = require("./devicegroup.entity");
const typeorm_2 = require("typeorm");
let DevicegroupService = class DevicegroupService {
    constructor(devicegroupRepo) {
        this.devicegroupRepo = devicegroupRepo;
    }
    async findAll() {
        return await this.devicegroupRepo.find();
    }
    async findOne(Id) {
        return await this.devicegroupRepo.findOne(Id);
    }
    async create(devicegroup) {
        return await this.devicegroupRepo.save(devicegroup);
    }
    async update(devicegroup) {
        return await this.devicegroupRepo.update(devicegroup.Id, devicegroup);
    }
    async delete(Id) {
        return await this.devicegroupRepo.delete(Id);
    }
};
DevicegroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(devicegroup_entity_1.Devicegroup)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DevicegroupService);
exports.DevicegroupService = DevicegroupService;
//# sourceMappingURL=devicegroup.service.js.map