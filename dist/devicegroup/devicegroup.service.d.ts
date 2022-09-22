import { Devicegroup } from './devicegroup.entity';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
export declare class DevicegroupService {
    private readonly devicegroupRepo;
    constructor(devicegroupRepo: Repository<Devicegroup>);
    findAll(): Promise<Devicegroup[]>;
    findOne(Id: number): Promise<Devicegroup>;
    create(devicegroup: Devicegroup): Promise<Devicegroup>;
    update(devicegroup: Devicegroup): Promise<UpdateResult>;
    delete(Id: any): Promise<DeleteResult>;
}
