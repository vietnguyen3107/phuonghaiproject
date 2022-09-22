import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../user/user.service";
import { User } from "./user.entity";
export interface RequestModel extends Request {
    user: User;
}
export declare class BasicAuthMiddleware implements NestMiddleware {
    private readonly userService;
    constructor(userService: UserService);
    use(req: RequestModel, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
