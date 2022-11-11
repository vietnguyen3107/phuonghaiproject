import { Device } from "src/device/device.entity";
import { UserDevicegroup } from "src/user-devicegroup/entities/user-devicegroup.entity";

export class CreateUserDevicegroupDeviceDto {
    Device: Device;
    Group: UserDevicegroup;
    Orderno: number;
}
