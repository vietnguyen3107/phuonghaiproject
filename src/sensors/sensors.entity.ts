import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SensorsEntity{
  @PrimaryGeneratedColumn()
  Id: number;

  @Column('text') 
  Key: string;

  @Column('text')
  Measure: string;

  @Column()
  Status: boolean;

  @Column()
  Value: number;

  @Column()
  DevicesId: number;

}

