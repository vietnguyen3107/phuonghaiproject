import { Injectable } from '@nestjs/common';
import {DataLabEntity } from './data-lab.entity' 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class DataLabService {
  constructor(
    @InjectRepository(DataLabEntity)
    private readonly dataLabRepo: Repository<DataLabEntity >,
  ) {}

  async findAll (): Promise<DataLabEntity []> {
    return await this.dataLabRepo.find();
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

