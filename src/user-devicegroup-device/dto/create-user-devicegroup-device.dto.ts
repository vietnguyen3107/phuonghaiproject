import { ApiProperty } from "@nestjs/swagger";
import { Device } from "src/device/device.entity";
import { UserDevicegroup } from "src/user-devicegroup/entities/user-devicegroup.entity";

export class CreateUserDevicegroupDeviceDto {
    @ApiProperty({ 
        description: 'Thiết bị gán vào nhóm',
        type: Device 
    })
    Device: Device;

    @ApiProperty({ 
        description: 'Nhóm thiết bị',
        type: UserDevicegroup 
    })
    Group: UserDevicegroup;

    @ApiProperty({
        description: 'Thứ tự sắp xếp thiết bị trong nhóm',
        example: 1
      })
    Orderno: number;
}
