import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Devicegroup {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column('text')
    Name: string;
    @Column('text')
    Description: string
}
