import { StreamableFile } from '@nestjs/common';
import { DatumService } from './datum.service';
import { Datum } from './datum.entity';
import { RequestModel } from 'src/user/basic.auth.middleware';
export declare class DatumController {
    private readonly datumService;
    constructor(datumService: DatumService);
    filter(sensorType: string, deviceSerialNumber: string): Promise<Datum[]>;
    filter1(sensorType: string, deviceSerialNumber: string): Promise<Datum[]>;
    filter2(sensorType: string, deviceSerialNumber: string): Promise<Datum[]>;
    filter3(sensorType: string, deviceSerialNumber: string): Promise<Datum[]>;
    filter4(startDate: string, endDate: string): Promise<any>;
    filter7(deviceSerialNumber: string, startDate: string, endDate: string): Promise<any>;
    filter5(deviceSerialNumber: string): Promise<Datum[]>;
    filter5a(req: RequestModel): Promise<any>;
    filter8(deviceSerialNumber: string, startDate: string, endDate: string): Promise<any>;
    getFile(): StreamableFile;
    filter9(deviceSerialNumber: string, startDate: string, endDate: string): Promise<StreamableFile>;
    findAll(): Promise<Datum[]>;
    get(params: any): Promise<Datum>;
    create(datum: Datum, req: any): Promise<any>;
    createBatch(datums: Datum[]): Promise<any[]>;
    update(datum: Datum): Promise<import("typeorm").UpdateResult>;
    deleteUser(params: any): Promise<import("typeorm").DeleteResult>;
}
