import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Lab{
  @PrimaryGeneratedColumn()
  Id: number;

  @Column('text' ) 
  Description: string;

  @Column('text')
  Devices: string;

  @Column('text')
  FriendlyName: string;

  @Column('text')
  Model: string;

  @Column('text')
  SerialNumber: string;

  @Column('text')
  Type: string;

  @Column()
  IsActive: boolean;

}
