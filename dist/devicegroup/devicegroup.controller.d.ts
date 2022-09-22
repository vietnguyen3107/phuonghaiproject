import { DevicegroupService } from './devicegroup.service';
import { Devicegroup } from './devicegroup.entity';
export declare class DevicegroupController {
    private readonly devicegroupService;
    constructor(devicegroupService: DevicegroupService);
    findAll(): Promise<Devicegroup[]>;
    get(params: any): Promise<Devicegroup>;
    create(devicegroup: Devicegroup): Promise<Devicegroup>;
    update(devicegroup: Devicegroup): Promise<import("typeorm").UpdateResult>;
    deleteUser(params: any): Promise<import("typeorm").DeleteResult>;
}
