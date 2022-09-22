import { DeviceService } from './device.service';
import { Device } from './device.entity';
import { RequestModel } from 'src/user/basic.auth.middleware';
export declare class DeviceController {
    private readonly deviceService;
    constructor(deviceService: DeviceService);
    search(SerialNumber: string): Promise<Device>;
    findAll(request: RequestModel): Promise<Device[]>;
    findDevicesByUser(request: RequestModel): Promise<Device[]>;
    get(params: any): Promise<Device>;
    create(lab: Device): Promise<Device>;
    update(lab: Device): Promise<import("typeorm").UpdateResult>;
    deleteUser(params: any): Promise<import("typeorm").DeleteResult>;
}
