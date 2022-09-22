import { UserDeviceService } from './userdevice.service';
import { UserDevice } from './userdevice.entity';
export declare class UserdeviceController {
    private readonly userdeviceService;
    constructor(userdeviceService: UserDeviceService);
    create(userDevice: UserDevice): Promise<UserDevice>;
    create2(userDevices: UserDevice[]): Promise<{
        Status: string;
        Error?: undefined;
    } | {
        Error: any;
        Status?: undefined;
    }>;
    findOne(params: any): Promise<UserDevice>;
    filter(deviceSerialNumber: string): Promise<any>;
    remove(params: any): string;
}
