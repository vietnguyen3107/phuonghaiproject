import { Injectable } from '@nestjs/common';
import { Lab } from './lab.entity' 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class LabService {
  constructor(
    @InjectRepository(Lab)
    private readonly labRepo: Repository<Lab>,
  ) {}

  async findAll (): Promise<Lab[]> {
    return await this.labRepo.find();
  }

  async findOne (Id: number): Promise<Lab> {
    return await this.labRepo.findOne(Id)
  }


  async create (task: Lab): Promise<Lab> {
    return await this.labRepo.save(task)
  }

  async update(task: Lab): Promise<UpdateResult> {
    return await this.labRepo.update(task.Id, task);
  }

  async delete(Id): Promise<DeleteResult> {
    return await this.labRepo.delete(Id);
  }
}
