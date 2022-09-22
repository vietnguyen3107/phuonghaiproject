import { Lab } from './lab.entity';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
export declare class LabService {
    private readonly labRepo;
    constructor(labRepo: Repository<Lab>);
    findAll(): Promise<Lab[]>;
    findOne(Id: number): Promise<Lab>;
    create(task: Lab): Promise<Lab>;
    update(task: Lab): Promise<UpdateResult>;
    delete(Id: any): Promise<DeleteResult>;
    findOneBySerialNumber(SerialNumber: string): Promise<Lab>;
}
