import { Datum } from './datum.entity';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { LabService } from 'src/lab/lab.service';
import { Datum_lastest } from './datum_lastest.entity';
export declare class DatumService {
    private readonly datumRepo;
    private readonly datumlastestRepo;
    private readonly labService;
    constructor(datumRepo: Repository<Datum>, datumlastestRepo: Repository<Datum_lastest>, labService: LabService);
    findAll(): Promise<Datum[]>;
    findOne(Id: number): Promise<Datum>;
    create(datum: Datum): Promise<any>;
    update(task: Datum): Promise<UpdateResult>;
    delete(Id: any): Promise<DeleteResult>;
    getDatumLastHour(sensorType: string, deviceSerialNumber: string): Promise<Datum[]>;
    getDatumLast24Hours(sensorType: string, deviceSerialNumber: string): Promise<Datum[]>;
    getDatumLast7Days(sensorType: string, deviceSerialNumber: string): Promise<Datum[]>;
    getDatumLast30Days(sensorType: string, deviceSerialNumber: string): Promise<Datum[]>;
    getStatisticData(startDate: string, endDate: string): Promise<any>;
    getLastestDataByDevice(deviceSerialNumber: string): Promise<Datum[]>;
    getLastestDataByAllDevices2(userId: number): Promise<any>;
    getStatisticDataByDevice(deviceSerialNumber: string, startDate: string, endDate: string): Promise<any>;
    getStatisticDataBySensor(deviceSerialNumber: string, startDate: string, endDate: string): Promise<any>;
    getDataByDate(deviceSerialNumber: string, startDate: string, endDate: string): Promise<Datum[]>;
}
