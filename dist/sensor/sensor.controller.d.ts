import { SensorService } from './sensor.service';
import { Sensor } from './sensor.entity';
export declare class SensorController {
    private readonly sensorService;
    constructor(sensorService: SensorService);
    findAll(): Promise<Sensor[]>;
    get(params: any): Promise<Sensor>;
    create(sensor: Sensor): Promise<Sensor>;
    createBatch(sensors: Sensor[]): Sensor[];
    update(sensor: Sensor): Promise<import("typeorm").UpdateResult>;
    deleteUser(params: any): Promise<import("typeorm").DeleteResult>;
}
