import { Devicegroup } from 'src/devicegroup/devicegroup.entity';
import { Sensor } from 'src/sensor/sensor.entity';
import { UserDevice } from 'src/userdevice/userdevice.entity';
export declare class Device {
    Id: number;
    DateSync: string;
    Description: string;
    FriendlyName: string;
    Model: string;
    SerialNumber: string;
    Type: string;
    Devicegroup: Devicegroup;
    Sensors: Sensor[];
    LabSerialNumber: string;
    IsActive: boolean;
    userDevices: UserDevice[];
}
