import { Device } from "src/device/device.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
@Entity()
export class Devicegroup {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column('text')
    Name: string;
    @Column('text')
    Description: string

    @OneToMany(type => Device, device => device.Devicegroup, {eager: false})
    devices: Device[] 

}
