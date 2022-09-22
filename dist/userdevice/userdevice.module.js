"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserdeviceModule = void 0;
const common_1 = require("@nestjs/common");
const userdevice_service_1 = require("./userdevice.service");
const userdevice_controller_1 = require("./userdevice.controller");
const typeorm_1 = require("@nestjs/typeorm");
const userdevice_entity_1 = require("./userdevice.entity");
const user_module_1 = require("../user/user.module");
let UserdeviceModule = class UserdeviceModule {
};
UserdeviceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([userdevice_entity_1.UserDevice]), user_module_1.UserModule],
        controllers: [userdevice_controller_1.UserdeviceController],
        providers: [userdevice_service_1.UserDeviceService]
    })
], UserdeviceModule);
exports.UserdeviceModule = UserdeviceModule;
//# sourceMappingURL=userdevice.module.js.map