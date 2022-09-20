import { truncate } from 'fs';
import { UserDevice } from 'src/userdevice/userdevice.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { Transform } from 'class-transformer';

@Entity('user')
export class User{
  @PrimaryGeneratedColumn()
  Id: number;

  @Column('text') 
  Email: string;

  @Column('text')
  Password: string;

  
  @Column('text')
  resetToken: string;
  @Column('datetime')
  resetDate: Date;



  @Column('tinyint')
  isDeleted: boolean;

  @Column('datetime')
  deletedDate: Date;

}
