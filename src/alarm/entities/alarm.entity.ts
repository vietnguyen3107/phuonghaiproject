import { Datum } from "src/datum/datum.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('alarm')
export class Alarm {
    @PrimaryGeneratedColumn()
    Id: number;

    @OneToOne(() => Datum)
    @JoinColumn()
    Datum: Datum
      
    @Column({ length: 100 })
    CreatedBy: string;

    
    @Column({ type: 'datetime' })
    CreatedDate: Date;
    
    @Column({ length: 1024 })
    Message: string;

    @Column({ length: 190 })
    DeviceSerialNumber: string;

    @Column("float") 
    Value: number;
    @Column("float") 
    MinValue: number;
    @Column("float") 
    MaxValue: number;
    
    @Column({ length: 100 })
    SensorType: string;
  
    @Column({ type: 'datetime' })
    ReceivedDate: string;
}
