import { User } from 'src/user/user.entity';
import { Column, Entity, OneToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Device } from 'src/device/device.entity';

@Entity('userdevice')
export class UserDevice{
  @PrimaryGeneratedColumn()
  Id: number;



  @Column('text')
  DeviceSerialNumber: string

  @Column('int')
  DeviceId: number

  @ManyToOne(type => User, user => user.userDevices,  {eager: false})
  @JoinColumn({name: "User_Id"})   
  User: User;

  // @ManyToOne(() => User, user => user.photos)
  // user: User;

  @ManyToOne(type => Device, device => device.userDevices,  {eager: false})
  @JoinColumn({name: "Device_Id"})  
  Device: Device;


}