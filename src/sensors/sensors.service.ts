import { Injectable } from '@nestjs/common';
import { SensorsEntity } from './sensors.entity' 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(SensorsEntity)
    private readonly sensorsRepo: Repository<SensorsEntity>,
  ) {}

  async findAll (): Promise<SensorsEntity[]> {
    return await this.sensorsRepo.find();
  }

  async findOne (Id: number): Promise<SensorsEntity> {
    return await this.sensorsRepo.findOne(Id)
  }


  async create (task: SensorsEntity): Promise<SensorsEntity> {
    return await this.sensorsRepo.save(task)
  }

  async update(task: SensorsEntity): Promise<UpdateResult> {
    return await this.sensorsRepo.update(task.Id, task);
  }

  async delete(Id): Promise<DeleteResult> {
    return await this.sensorsRepo.delete(Id);
  }
}
