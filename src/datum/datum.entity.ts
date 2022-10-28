
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique("unique_datum", ["DeviceSerialNumber", "SensorType", "ReceivedDate"]) // named; multiple fields
export class Datum{
  @PrimaryGeneratedColumn() 
  @ApiProperty({
    description: 'ID dữ liệu Datum',
    example: '142'
  })
  Id: number;

  @Column({ type: 'datetime' })
  @ApiProperty({
    description: 'ngày ghi nhận dữ liệu',
    example: '2022-10-25'
  })
  ReceivedDate: string;

  @Column("float") 
  @ApiProperty({
    description: 'Giá trị ghi nhận',
    example: 45.5
  })
  Value: number;
  
  @Column({ length: 100 })
  @ApiProperty({
    description: 'Mã loại Sensor',
    example: 'humidity'
  })
  SensorType: string;

  @Column({ length: 100 })
  @ApiProperty({
    description: 'Đơn vị đo lường',
    example: '%'
  })
  Unit: string;

  @Column({ length: 100 })
  @ApiProperty({
    description: 'Trạng thái dữ liệu: good/error',
    example: 'good'
  })
  Status: string;

  @Column({ length: 100 })
  @ApiProperty({
    description: 'Số serial thiết bị quan trắc',
    example: 'Log01210325'
  })
  DeviceSerialNumber: string;

  
  @Column({ default: false })
  AlarmYN: boolean = false;
  
  @Column({ length: 100 })
  CreatedBy: string;

  
  @Column({ type: 'datetime' })
  CreatedDate: Date;

}

