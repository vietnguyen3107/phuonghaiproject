
import { Datum } from "src/datum/datum.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDevicegroupDto {

    @Column({ length: 1024 })
    @ApiProperty({
        description: 'tên nhóm',
        example: 'Nhó thiết bị 01'
      })
    Name: string;


    @Column({ length: 1024 })
    @ApiProperty({
        description: 'Mô tả nhóm',
        example: 'Nhóm thiêt bị quan trắc môi trường khu CN Phú Mỹ'
      })
    Description: string;


    @Column("int") 
    @ApiProperty({
      description: 'Thứ tự sắp xếp các nhóm',
      example: 1
    })
    Orderno: number;



}
