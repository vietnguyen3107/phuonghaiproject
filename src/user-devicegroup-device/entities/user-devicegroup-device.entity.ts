
import { Datum } from "src/datum/datum.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { User } from "src/user/user.entity";
import { UserDevicegroup } from "src/user-devicegroup/entities/user-devicegroup.entity";
import { Device } from "src/device/device.entity";

@Entity('user_devicegroup_device')
export class UserDevicegroupDevice {
    
    @PrimaryGeneratedColumn()
    @ApiProperty({
        description: 'ID nhóm',
        example: '3'
      })
    Id: number;
      
    @Column({ length: 100 })
    CreatedBy: string;

  
    @Column({ type: 'datetime' })
    CreatedDate: Date;


    @Column("int") 
    @ApiProperty({
      description: 'Thứ tự sắp xếp devie trong nhóm',
      example: 1
    })
    Orderno: number;
  
    @ManyToOne(type => Device, Device => Device.Id, { eager: false })
    @JoinColumn({ name: "DeviceId" })
    Device: Device;

    

  @ManyToOne(type => UserDevicegroup, UserDevicegroup => UserDevicegroup.Id,  {eager: false, onDelete:'CASCADE'})
  @JoinColumn({name: "GroupId", referencedColumnName: "Id"})    
    Group: UserDevicegroup;
}
