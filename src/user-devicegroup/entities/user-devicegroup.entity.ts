import { Datum } from "src/datum/datum.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { User } from "src/user/user.entity";
import { UserDevicegroupDevice } from "src/user-devicegroup-device/entities/user-devicegroup-device.entity";

@Entity('user_devicegroup')
export class UserDevicegroup {

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
    
    @Column({ length: 1024 })
    @ApiProperty({
        description: 'tên nhóm',
        example: 'Nhó thiết bị 01'
      })
    Name: string;


    @Column({ length: 1024 })
    @ApiProperty({
        description: 'Mô tả nhóm',
        example: 'Nhóm thiêt bị quan trắc môi trường khu CN Phú Mỹ'
      })
    Description: string;


    @Column("int") 
    @ApiProperty({
      description: 'Thứ tự sắp xếp các nhóm',
      example: 1
    })
    Orderno: number;

    @ManyToOne(type => User, User => User.Id, { eager: false })
    @JoinColumn({ name: "UserId" })
    // defining this is also optional because by default,
    // the referenced foreign key is named as <column_name>_id or account_id
    User: User;

    @OneToMany(() => UserDevicegroupDevice, UserDevicegroupDevice => UserDevicegroupDevice.Group)
    @JoinColumn()
    Devices: UserDevicegroupDevice[] 
}
