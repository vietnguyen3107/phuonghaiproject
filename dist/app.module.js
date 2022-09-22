"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const lab_module_1 = require("./lab/lab.module");
const sensor_module_1 = require("./sensor/sensor.module");
const device_module_1 = require("./device/device.module");
const datum_module_1 = require("./datum/datum.module");
const user_module_1 = require("./user/user.module");
const basic_auth_middleware_1 = require("./user/basic.auth.middleware");
const userdevice_module_1 = require("./userdevice/userdevice.module");
const devicegroup_module_1 = require("./devicegroup/devicegroup.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(basic_auth_middleware_1.BasicAuthMiddleware)
            .exclude('Users/Auth/(.*)', 'frontend/(.*)')
            .forRoutes('/');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: "phuonghaigreenlab@gmail.com",
                        pass: "4ngoiSao"
                    },
                },
                defaults: {
                    from: '"nest-modules" <user@outlook.com>',
                },
                template: {
                    dir: process.cwd() + '/template/',
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'frontend'),
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: '52.74.63.36',
                port: 3306,
                username: 'phuonghai',
                password: 'phuonghai',
                database: 'phuonghai',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                logging: true,
                autoLoadEntities: true,
                synchronize: false,
            }),
            lab_module_1.LabModule, sensor_module_1.SensorModule, device_module_1.DeviceModule, datum_module_1.DatumModule, user_module_1.UserModule, userdevice_module_1.UserdeviceModule, devicegroup_module_1.DevicegroupModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map