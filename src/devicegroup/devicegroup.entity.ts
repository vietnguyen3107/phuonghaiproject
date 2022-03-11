import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Devicegroup {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({length:500})
    Name: string;
    @Column('text')
    Description: string
}
