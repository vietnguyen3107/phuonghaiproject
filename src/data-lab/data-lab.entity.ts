import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DataLabEntity{
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'date' })
  ReceivedDate: string;

  @Column() 
  Value: number;
 
  @Column()
  SensorsId: number;
}