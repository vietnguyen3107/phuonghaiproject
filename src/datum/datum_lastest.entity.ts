import { isEmpty } from 'rxjs';
import internal from 'stream';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, IsNull, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn, VersionColumn } from 'typeorm';

@Entity()
@Unique("unique_datumlastest", ["DeviceSerialNumber", "SensorType"]) // named; multiple fields
export class Datum_lastest{

  @Column({ length: 100 })
  @PrimaryColumn()
  DeviceSerialNumber: string;


  @PrimaryColumn()
  @Column({ length: 100 })
  SensorType: string;

  @Column({ type: 'datetime' })
  ReceivedDate: string;

  @Column("float") 
  Value: number;
  
  @Column({ length: 100 })
  Unit: string;

  @Column({ length: 100 })
  Status: string;

  @CreateDateColumn({ type: 'datetime' })
  CreateDate : Date;

  @UpdateDateColumn({ type: 'datetime' })
  UpdateDate : Date;

  @VersionColumn({ type: 'int' })
  Version: BigInteger;
}
