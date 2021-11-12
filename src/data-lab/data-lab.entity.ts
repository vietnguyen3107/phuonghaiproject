import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DataLabEntity{
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'timestamp' })
  ReceivedDate: string;

  @Column() 
  Value: number;
 
  @Column()
  SensorsId: number;

  //thêm 2 cột nữa là SensorType - string và DeviceSerialNumber string

}