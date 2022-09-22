import { Device } from './device.entity';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
export declare class DeviceService {
    private readonly deviceRepo;
    constructor(deviceRepo: Repository<Device>);
    findAll(): Promise<Device[]>;
    findDevicesByUser(userId: number): Promise<Device[]>;
    findOne(Id: number): Promise<Device>;
    create(task: Device): Promise<Device>;
    update(task: Device): Promise<UpdateResult>;
    delete(Id: any): Promise<DeleteResult>;
    findOneBySerialNumber(SerialNumber: string): Promise<Device>;
}
