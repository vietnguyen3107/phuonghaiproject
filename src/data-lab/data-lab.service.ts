import { Injectable } from '@nestjs/common';
import {DataLabEntity } from './data-lab.entity' 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';
import { getManager } from 'typeorm';

@Injectable()
export class DataLabService {
  constructor(
    @InjectRepository(DataLabEntity)
    private readonly dataLabRepo: Repository<DataLabEntity >,
  ) {}

  async findAll (): Promise<DataLabEntity []> {
    return await this.dataLabRepo.find();
  }

  async search (): Promise<DataLabEntity []> {

    //const results = await this.dataLabRepo.createQueryBuilder() 
    // const builder = this.dataLabRepo.createQueryBuilder("item")
    // // const total = await builder.where("user.name like :name", { name: '%' + keyword + '%' }).getCount()
    // const data = await builder
    // .where("item.ReceivedDate='2021-11-12T06:30:00.000Z'")
    // .orderBy('id', 'DESC')
    // .skip(0)
    // .take(2).getMany();

    const entityManager = getManager();
    const rawData = entityManager.query('select * from data_lab_entity where value<100')
  

    return rawData
  }

  async findOne (Id: number): Promise<DataLabEntity > {
    return await this.dataLabRepo.findOne(Id)
  }


  async create (task: DataLabEntity ): Promise<DataLabEntity > {
    return await this.dataLabRepo.save(task)
  }

  async update(task: DataLabEntity ): Promise<UpdateResult> {
    return await this.dataLabRepo.update(task.Id, task);
  }

  async delete(Id): Promise<DeleteResult> {
    return await this.dataLabRepo.delete(Id);
  }
}

