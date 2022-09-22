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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcryptjs");
const mail_service_1 = require("../mail/mail.service");
let UserController = class UserController {
    constructor(userService, mailService) {
        this.userService = userService;
        this.mailService = mailService;
    }
    findAll() {
        return this.userService.findAll();
    }
    get(params) {
        return this.userService.findOne(params.Id);
    }
    async update(user) {
        const hash = await bcrypt.hash(user.Password, 10);
        user.Password = await hash;
        return this.userService.update(user);
    }
    inactiveUser(req) {
        const user = new user_entity_1.User();
        user.Id = req.user.Id;
        user.isDeleted = true;
        user.deletedDate = new Date();
        user.deletedBy = req.user.Email;
        return this.userService.update(user);
    }
    deleteUser(params, req) {
        const user = new user_entity_1.User();
        user.Id = params.Id;
        user.isDeleted = true;
        user.deletedDate = new Date();
        user.deletedBy = req.user.Email;
        return this.userService.update(user);
    }
    async register(user) {
        let dbUser = await this.userService.findByEmail(user);
        if (!dbUser) {
            const hash = await bcrypt.hash(user.Password, 10);
            user.Password = hash;
            return this.userService.create(user);
        }
        else
            return { status: common_1.HttpStatus.BAD_REQUEST, message: "Email already exists" };
    }
    async forget_password(body) {
        const obj = new user_entity_1.User();
        obj.Email = body.email;
        let dbUser = await this.userService.findByEmail(obj);
        if (!dbUser) {
            return { status: common_1.HttpStatus.BAD_REQUEST, message: "Email not exists" };
        }
        else {
            const token = Math.random().toString(36).slice(-8);
            dbUser.resetToken = token;
            dbUser.resetDate = new Date();
            await this.userService.update(dbUser);
            await this.mailService.send(dbUser.Email, "Reset password Confirm", "/templates/index", { email: dbUser.Email, token: token });
            return { status: common_1.HttpStatus.OK, message: "Reset email has been sent!" };
        }
    }
    async reset_password(email, token) {
        const obj = new user_entity_1.User();
        obj.Email = email;
        let dbUser = await this.userService.findByEmail(obj);
        dbUser.resetDate.setDate(dbUser.resetDate.getDate() + 1);
        if (!dbUser) {
            return { status: common_1.HttpStatus.BAD_REQUEST, message: "Email not exists" };
        }
        else if (!dbUser.resetDate || dbUser.resetDate < new Date()) {
            return { status: common_1.HttpStatus.BAD_REQUEST, message: "Token has been expired!" };
        }
        else if (!dbUser.resetToken || dbUser.resetToken !== token) {
            return { status: common_1.HttpStatus.BAD_REQUEST, message: "Token not valid!" };
        }
        else {
            const randomstring = Math.random().toString(36).slice(-8);
            const hash = await bcrypt.hash(randomstring, 10);
            dbUser.Password = hash;
            dbUser.resetDate = null;
            dbUser.resetToken = null;
            await this.userService.update(dbUser);
            return { status: common_1.HttpStatus.OK, message: "Password has been reset to '" + randomstring + "', please use it to login and change to your new password!" };
        }
    }
    async login(user) {
        return await this.userService.login(user);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':Id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/Auth'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "inactiveUser", null);
__decorate([
    (0, common_1.Delete)(':Id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)('/Auth/Register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/Auth/ForgetPass'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forget_password", null);
__decorate([
    (0, common_1.Get)('/Auth/ResetPass'),
    __param(0, (0, common_1.Query)('email')),
    __param(1, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "reset_password", null);
__decorate([
    (0, common_1.Post)('/Auth/Login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = __decorate([
    (0, common_1.Controller)('Users'),
    __metadata("design:paramtypes", [user_service_1.UserService, mail_service_1.MailService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map