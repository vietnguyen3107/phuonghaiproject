import { HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RequestModel } from './basic.auth.middleware';
import { MailService } from 'src/mail/mail.service';
export declare class UserController {
    private readonly userService;
    private mailService;
    constructor(userService: UserService, mailService: MailService);
    findAll(): Promise<User[]>;
    get(params: any): Promise<User>;
    update(user: User): Promise<import("typeorm").UpdateResult>;
    inactiveUser(req: RequestModel): Promise<import("typeorm").UpdateResult>;
    deleteUser(params: any, req: any): Promise<import("typeorm").UpdateResult>;
    register(user: User): Promise<User | {
        status: HttpStatus;
        message: string;
    }>;
    forget_password(body: any): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    reset_password(email: any, token: any): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    login(user: User): Promise<any>;
}
