import { UserDevice } from './userdevice.entity';
import { Repository } from 'typeorm';
export declare class UserDeviceService {
    private readonly userDeviceRepo;
    constructor(userDeviceRepo: Repository<UserDevice>);
    findAll(): Promise<UserDevice[]>;
    findOne(id: number): Promise<UserDevice>;
    remove(id: number): string;
    create(userDevice: UserDevice): Promise<UserDevice>;
    getAllUserDevicesByDevice(deviceSerialNumber: string): Promise<UserDevice[]>;
}
