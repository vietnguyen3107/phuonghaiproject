import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserDevice } from "src/userdevice/userdevice.entity";
import { UserService } from "../user/user.service";
import { User } from "./user.entity";
const url = require('url');
const querystring = require('querystring');



export interface RequestModel extends Request {
    user: User
}


@Injectable()
export class BasicAuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {
    }


    async use(req: RequestModel, res: Response, next: NextFunction) {
        //console.log(req.headers.authorization)

        // check for basic auth header
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            return res.status(401).json({ message: 'Missing Authorization Header' });
        }

        // verify auth credentials
        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [email, password] = credentials.split(':');
        const user = await this.userService.findByEmailAndPassword({ Id: -1, Email: email, Password: password, userDevices: [] });
        if (!user) {
            return res.status(401).json({ message: 'Invalid Authentication Credentials' });
        }


        // attach user to request object
        req.user = user

        var pathname = url.parse(req.url).pathname
        if (pathname.indexOf('SerialNumber')>=0){
        try {
            var query = url.parse(req.url).query
            // console.log('url='+url.parse(req.url).host)
            // console.log('url='+url.parse(req.url).pathname)
            // console.log('url='+url.parse(req.url).search)
            var qobject = querystring.parse(query);
            //console.log(qobject.DeviceSerialNumber)

            var permitted = false
            if (qobject !== '' && qobject !== null) {
                for (let i = 0; i < user.userDevices.length; i++) {
                    if (user.userDevices[i].DeviceSerialNumber === qobject.DeviceSerialNumber) {
                        permitted = true
                        break
                    }
                }
            }

            if (!permitted) {
                return res.status(401).json({ message: 'User not permitted on this device' });
            }
        }
        catch (e) {
            console.log(e.message)
        }
    }

        next();
    }


}