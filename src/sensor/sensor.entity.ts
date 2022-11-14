import { Datum } from 'src/datum/datum.entity';
import { Device } from 'src/device/device.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Sensor{
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'ID tự sinh của Sensor',
    example: '3'
  })
  Id: number;

  @Column('text')
  
  Measure: string;

  @Column()
  Status: string;

  // @Column()
  // DeviceId: number;

  @Column("float") 
  @ApiProperty({
    description: 'Ngưỡng cảnh báo dưới (MinValue)',
    example: 50
  })
  MinValue: number;

  
  @Column("float") 
  @ApiProperty({
    description: 'Ngưỡng cảnh báo trên (Maxvalue)',
    example: 100
  })
  MaxValue: number;


  @Column('text')
  @ApiProperty({
    description: 'Loại sensor',
    example: 'Humidity'
  }) 
  SensorType: string;

  @Column('text') 
  @ApiProperty({
    description: 'Số SerialNumber của thiết bị chứa Sensor',
    example: 'Log01210325'
  }) 
  DeviceSerialNumber: string;

  
  @Column({ length: 100 })
  CreatedBy: string;

  
  @Column({ type: 'datetime' })
  CreatedDate: Date;

  
  @Column({ length: 100 })
  UpdatedBy: string;

  
  @Column({ type: 'datetime' })
  UpdatedDate: Date;




  @ManyToOne(type => Device, Device => Device.Id,  {eager: false})
  @JoinColumn({name: "Device_Id", referencedColumnName: "Id"})    
  Device: Device;

  @OneToOne(type=>Datum)
  LatestDatum: Datum;



}
