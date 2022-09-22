import { Sensor } from './sensor.entity';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
export declare class SensorService {
    private readonly sensorRepo;
    constructor(sensorRepo: Repository<Sensor>);
    findAll(): Promise<Sensor[]>;
    findOne(Id: number): Promise<Sensor>;
    create(task: Sensor): Promise<Sensor>;
    update(task: Sensor): Promise<UpdateResult>;
    delete(Id: any): Promise<DeleteResult>;
}
