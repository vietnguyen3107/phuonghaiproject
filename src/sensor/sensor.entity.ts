import { Datum } from 'src/datum/datum.entity';
import { Device } from 'src/device/device.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sensor{
  @PrimaryGeneratedColumn()
  Id: number;

  @Column('text')
  Measure: string;

  @Column()
  Status: string;

  // @Column()
  // DeviceId: number;

  @Column("float") 
  MinValue: number;

  
  @Column("float") 
  MaxValue: number;


  @Column('text') 
  SensorType: string;

  @Column('text') 
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

   // defining this is also optional because by default,
   // the referenced foreign key is named as <column_name>_id or account_id
  Device: Device;

  @OneToOne(type=>Datum)
  LatestDatum: Datum;



}
