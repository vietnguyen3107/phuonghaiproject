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
exports.LabController = void 0;
const common_1 = require("@nestjs/common");
const lab_service_1 = require("./lab.service");
const lab_entity_1 = require("./lab.entity");
let LabController = class LabController {
    constructor(labService) {
        this.labService = labService;
    }
    search(SerialNumber) {
        return this.labService.findOneBySerialNumber(SerialNumber);
    }
    findAll() {
        return this.labService.findAll();
    }
    get(params) {
        return this.labService.findOne(params.Id);
    }
    create(lab) {
        return this.labService.create(lab);
    }
    update(lab) {
        return this.labService.update(lab);
    }
    deleteUser(params) {
        return this.labService.delete(params.Id);
    }
};
__decorate([
    (0, common_1.Get)('/Search?'),
    __param(0, (0, common_1.Query)('SerialNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LabController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LabController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':Id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LabController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lab_entity_1.Lab]),
    __metadata("design:returntype", void 0)
], LabController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lab_entity_1.Lab]),
    __metadata("design:returntype", void 0)
], LabController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':Id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LabController.prototype, "deleteUser", null);
LabController = __decorate([
    (0, common_1.Controller)('Labs'),
    __metadata("design:paramtypes", [lab_service_1.LabService])
], LabController);
exports.LabController = LabController;
//# sourceMappingURL=lab.controller.js.map