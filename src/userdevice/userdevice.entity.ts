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

  @ManyToOne(type => User, User => User.Id,  {eager: false})
  @JoinColumn({name: "User_Id", referencedColumnName: "Id"})   
  User: User;

  @ManyToOne(type => Device, Device => Device.Id,  {eager: false})
  @JoinColumn({name: "Device_Id", referencedColumnName: "Id"})   
  Device: Device;


}