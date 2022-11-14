import { Devicegroup } from 'src/devicegroup/devicegroup.entity';
import { Lab } from 'src/lab/lab.entity';
import { Sensor } from 'src/sensor/sensor.entity';
import { UserDevice } from 'src/userdevice/userdevice.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('device')
export class Device {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'ID thiết bị',
    example: '142'
  })
  Id: number;

  // @Transform(x => new Date('dd/mm/YYYY'))
  // @Column('text')
  // date: Date;
  @ApiProperty({
    description: 'Ngày đồng bộ',
    example: '25/12/2021'
  })
  @Column({ type: 'datetime' })
  DateSync: string;

  @Column('text')
  @ApiProperty({
    description: 'Mô tả thết bị',
    example: 'Máy 2022, công ty Phượng Hải'
  })
  Description: string;

  @Column('text') 
  @ApiProperty({
    description: 'Tên',
    example: 'Thiết bị quan trắc 01'
  })
  FriendlyName: string;

  @Column('text')
  @ApiProperty({
    description: 'Model thiết bị',
    example: 'VN123'
  })
  Model: string;

  @Column('text')
  @ApiProperty({
    description: 'Mã duy nhất',
    example: 'Log123456789'
  })
  SerialNumber: string;

  // @Column('text')
  // Sensors: string;

  @Column('text')
  @ApiProperty({
    description: 'Loại thiết bị',
    example: 'Datalogger'
  })
  Type: string;

  
  
  @Column({ length: 100 })
  CreatedBy: string;

  
  @Column({ type: 'datetime' })
  CreatedDate: Date;

  // @Column()
  // LabId: number;

  @ManyToOne(type => Devicegroup, Devicegroup => Devicegroup.Id, { eager: true })
  @JoinColumn({ name: "Devicegroup_Id2" })
  // defining this is also optional because by default,
  // the referenced foreign key is named as <column_name>_id or account_id
  Devicegroup: Devicegroup;

  @OneToMany(type => Sensor, Sensor => Sensor.Device, { eager: false })
  Sensors: Sensor[];

  @Column('text')
  @ApiProperty({
    description: 'Mã phòng lab',
    example: 'Lab001'
  })
  LabSerialNumber: string;

  @Column()
  @ApiProperty({
    description: 'Kích hoạt?',
    example: '1'
  })
  IsActive: boolean;

  @OneToMany(() => UserDevice, userDevice => userDevice.Device)
  @JoinColumn()
  userDevices: UserDevice[];
}
