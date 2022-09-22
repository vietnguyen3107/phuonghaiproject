"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatumModule = void 0;
const common_1 = require("@nestjs/common");
const datum_service_1 = require("./datum.service");
const datum_controller_1 = require("./datum.controller");
const typeorm_1 = require("@nestjs/typeorm");
const datum_entity_1 = require("./datum.entity");
const lab_module_1 = require("../lab/lab.module");
const datum_lastest_entity_1 = require("./datum_lastest.entity");
let DatumModule = class DatumModule {
};
DatumModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([datum_entity_1.Datum, datum_lastest_entity_1.Datum_lastest]), lab_module_1.LabModule],
        providers: [datum_service_1.DatumService],
        controllers: [datum_controller_1.DatumController]
    })
], DatumModule);
exports.DatumModule = DatumModule;
//# sourceMappingURL=datum.module.js.map