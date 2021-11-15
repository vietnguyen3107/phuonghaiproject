import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Datum{
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'datetime' })
  ReceivedDate: string;

  @Column() 
  Value: number;

  @Column('text') 
  Status: string;
  
  @Column('text') 
  SensorType: string;

  @Column('text') 
  DeviceSerialNumber: string;
}

