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

  @Column({ length: 100 })
  Status: string;
  
  @Column({ length: 100 })
  SensorType: string;

  @Column({ length: 100 })
  Unit: string;

  @Column({ length: 100 })
  DeviceSerialNumber: string;
}

