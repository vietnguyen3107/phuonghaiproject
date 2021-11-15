import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Transform } from 'class-transformer';

@Entity('device')
export class Device{
  @PrimaryGeneratedColumn()
  Id: number;

  // @Transform(x => new Date('dd/mm/YYYY'))
  // @Column('text')
  // date: Date;
  @Column({ type: 'datetime' })
  DateSync: string;

  @Column('text') 
  Description: string;

  @Column('text')
  FriendlyName: string;

  @Column('text')
  Model: string;

  @Column('text')
  SerialNumber: string;

  @Column('text')
  LabSerialNumber: string;

  @Column('text')
  Type: string;

  @Column()
  LabId: number;

  @Column()
  IsActive: boolean;
}
