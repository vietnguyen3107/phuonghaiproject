import { isEmpty } from 'rxjs';
import { Column, Entity, IsNull, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('text', {nullable: true}) 
  Unit: string;

  @Column('text') 
  DeviceSerialNumber: string;
}

