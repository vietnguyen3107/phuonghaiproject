import { isEmpty } from 'rxjs';
import { Column, Entity, IsNull, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Datum{
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'datetime' })
  ReceivedDate: string;

  @Column("float") 
  Value: number;

  @Column({ length: 10 })
  Status: string;
  
  @Column({ length: 15 })
  SensorType: string;

  @Column({ length: 10 })
  Unit: string;

  @Column({ length: 20 })
  DeviceSerialNumber: string;
}

