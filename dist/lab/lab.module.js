"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabModule = void 0;
const common_1 = require("@nestjs/common");
const lab_service_1 = require("./lab.service");
const lab_controller_1 = require("./lab.controller");
const typeorm_1 = require("@nestjs/typeorm");
const lab_entity_1 = require("./lab.entity");
let LabModule = class LabModule {
};
LabModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([lab_entity_1.Lab])],
        providers: [lab_service_1.LabService],
        controllers: [lab_controller_1.LabController],
        exports: [lab_service_1.LabService]
    })
], LabModule);
exports.LabModule = LabModule;
//# sourceMappingURL=lab.module.js.map