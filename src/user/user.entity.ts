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

  @OneToMany(type => UserDevice, userDevice => userDevice.User, {eager: true})
  userDevices: UserDevice[] 
}
