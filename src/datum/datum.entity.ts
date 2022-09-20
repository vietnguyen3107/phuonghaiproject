import { isEmpty } from 'rxjs';
import { Column, Entity, IsNull, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique("unique_datum", ["DeviceSerialNumber", "SensorType", "ReceivedDate"]) // named; multiple fields
export class Datum{
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'datetime' })
  ReceivedDate: string;

  @Column("float") 
  Value: number;
  
  @Column({ length: 100 })
  SensorType: string;

  @Column({ length: 100 })
  Unit: string;

  @Column({ length: 100 })
  Status: string;

  @Column({ length: 100 })
  DeviceSerialNumber: string;
}

