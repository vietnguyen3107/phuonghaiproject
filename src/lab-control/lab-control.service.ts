import { Injectable } from '@nestjs/common';
import { LabControlEntity } from './lab-control.entity' 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class LabControlService {
  constructor(
    @InjectRepository(LabControlEntity)
    private readonly labControlRepo: Repository<LabControlEntity>,
  ) {}

  async findAll (): Promise<LabControlEntity[]> {
    return await this.labControlRepo.find();
  }

  async findOne (Id: number): Promise<LabControlEntity> {
    return await this.labControlRepo.findOne(Id)
  }


  async create (task: LabControlEntity): Promise<LabControlEntity> {
    return await this.labControlRepo.save(task)
  }

  async update(task: LabControlEntity): Promise<UpdateResult> {
    return await this.labControlRepo.update(task.Id, task);
  }

  async delete(Id): Promise<DeleteResult> {
    return await this.labControlRepo.delete(Id);
  }
}
