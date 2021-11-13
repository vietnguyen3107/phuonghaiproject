import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sensor{
  @PrimaryGeneratedColumn()
  Id: number;

  @Column('text') 
  Key: string;

  @Column('text')
  Measure: string;

  @Column()
  Status: string;

  @Column()
  Value: number;

  @Column()
  DeviceId: number;

}
