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

  @ManyToOne(type => User, {eager: false})
  @JoinColumn({name: "User_Id"})   
  User: User;


  @ManyToOne(type => Device, device => device.userDevices,  {eager: false})
  @JoinColumn({name: "DeviceId"})  
  Device: Device;


  
  @Column({ length: 100 })
  CreatedBy: string;

  
  @Column({ type: 'datetime' })
  CreatedDate: Date;

}