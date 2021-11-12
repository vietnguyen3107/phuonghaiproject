import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Transform } from 'class-transformer';

@Entity()
export class DevicesEntity{
  @PrimaryGeneratedColumn()
  Id: number;

  // @Transform(x => new Date('dd/mm/YYYY'))
  // @Column('text')
  // date: Date;
  @Column({ type: 'date' })
  ReceivedDate: string;

  @Column('text') 
  Description: string;

  @Column('text')
  FriendlyName: string;

  @Column('text')
  Model: string;

  @Column('text')
  SerialNumber: string;

  @Column('text')
  Sensors: string;

  @Column('text')
  Type: string;

  @Column()
  LabControlId: number;

  @Column()
  IsActive: boolean;
}

