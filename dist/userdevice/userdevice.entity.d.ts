import { User } from 'src/user/user.entity';
import { Device } from 'src/device/device.entity';
export declare class UserDevice {
    Id: number;
    DeviceSerialNumber: string;
    DeviceId: number;
    User: User;
    Device: Device;
}
