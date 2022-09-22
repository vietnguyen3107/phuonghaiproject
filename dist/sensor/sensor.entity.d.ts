import { Datum } from 'src/datum/datum.entity';
import { Device } from 'src/device/device.entity';
export declare class Sensor {
    Id: number;
    Measure: string;
    Status: string;
    SensorType: string;
    DeviceSerialNumber: string;
    Device: Device;
    LatestDatum: Datum;
}
