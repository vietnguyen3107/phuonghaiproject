import { LabService } from './lab.service';
import { Lab } from './lab.entity';
export declare class LabController {
    private readonly labService;
    constructor(labService: LabService);
    search(SerialNumber: string): Promise<Lab>;
    findAll(): Promise<Lab[]>;
    get(params: any): Promise<Lab>;
    create(lab: Lab): Promise<Lab>;
    update(lab: Lab): Promise<import("typeorm").UpdateResult>;
    deleteUser(params: any): Promise<import("typeorm").DeleteResult>;
}
