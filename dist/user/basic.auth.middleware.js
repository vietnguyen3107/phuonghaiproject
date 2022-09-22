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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicAuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const userdevice_entity_1 = require("../userdevice/userdevice.entity");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("./user.entity");
const url = require('url');
const querystring = require('querystring');
let BasicAuthMiddleware = class BasicAuthMiddleware {
    constructor(userService) {
        this.userService = userService;
    }
    async use(req, res, next) {
        console.log(req.headers.authorization);
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            return res.status(401).json({ message: 'Missing Authorization Header' });
        }
        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [email, password] = credentials.split(':');
        let login = new user_entity_1.User();
        login.Email = email;
        login.Password = password;
        const user = await this.userService.findByEmailAndPassword(login);
        if (!user) {
            return res.status(401).json({ message: 'Invalid Authentication Credentials' });
        }
        req.user = user;
        next();
    }
};
BasicAuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], BasicAuthMiddleware);
exports.BasicAuthMiddleware = BasicAuthMiddleware;
//# sourceMappingURL=basic.auth.middleware.js.map