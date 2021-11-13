import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Datum{
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'datetime' })
  ReceivedDate: string;

  @Column() 
  Value: number;
 
  @Column()
  SensorId: number;
  @Column('text') 
  SensorType: string;

  @Column('text') 
  DeviceSerialNumber: string;
}

