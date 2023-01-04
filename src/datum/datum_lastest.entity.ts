import { isEmpty } from 'rxjs';
import internal from 'stream';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, IsNull, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn, VersionColumn } from 'typeorm';

@Entity()
@Unique("unique_datumlastest", ["DeviceSerialNumber", "SensorType"]) // named; multiple fields
export class Datum_lastest{

  @Column({ length: 100 })
  @PrimaryColumn()
  DeviceSerialNumber: string;

  @Column({ length: 100 })
  @PrimaryColumn()
  SensorType: string;

  @Column({ type: 'datetime' })
  ReceivedDate: string;

  @Column("float") 
  Value: number;
  
  @Column({ length: 100 })
  Unit: string;

  @Column({ length: 100 })
  Status: string;

  @Column({ default: false })
  AlarmYN: boolean = false;
  
  @Column({ length: 100 })
  CreatedBy: string;
  
  @Column({ type: 'datetime' })
  CreatedDate : Date;

  @Column({ type: 'datetime' })
  UpdatedDate : Date;

  @Column({ type: 'int' })
  Version: BigInteger;
}

