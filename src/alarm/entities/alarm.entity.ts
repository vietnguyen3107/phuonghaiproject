import { Datum } from "src/datum/datum.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity('alarm')
export class Alarm {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        description: 'ID thông báo',
        example: '3'
      })
    Id: number;

    @OneToOne(() => Datum)
    @JoinColumn()
    @ApiProperty({
        description: 'Dữ liệu Datum cảnh báo',
        example: '3'
      })
    Datum: Datum
      
    @Column({ length: 100 })
    CreatedBy: string;

    
    @Column({ type: 'datetime' })
    CreatedDate: Date;
    
    @Column({ length: 1024 })
    @ApiProperty({
        description: 'Nội dung thông báo',
        example: 'Cảnh báo thiết bị Log123, Sensor Humidity có giá trị ngoài ngưỡng cho phép!'
      })
    Message: string;

    @Column({ length: 190 })
    @ApiProperty({
        description: 'Số serial thiết bị',
        example: 'Log01210325_vietviet'
      })
    DeviceSerialNumber: string;

    @Column("float") 
    @ApiProperty({
        description: 'Giá trị cảnh báo',
        example: 103
      })
    Value: number;

    @Column("float") 
    @ApiProperty({
        description: 'Giá trị Min',
        example: 40
      })
    MinValue: number;


    @Column("float") 
    @ApiProperty({
        description: 'Giá trị Max',
        example: 100
      })
    MaxValue: number;
    
    @Column({ length: 100 })
    @ApiProperty({
        description: 'Loại sendsor',
        example: 'Humidity'
      })
    SensorType: string;
  
    @Column({ type: 'datetime' })
    @ApiProperty({
        description: 'Ngày ghi nhận dữ liệu',
        example: '25/12/2021'
      })
    ReceivedDate: string;
}
