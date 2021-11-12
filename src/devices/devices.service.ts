import { Injectable } from '@nestjs/common';
import { DevicesEntity } from './devices.entity' 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(DevicesEntity)
    private readonly devicesRepo: Repository<DevicesEntity>,
  ) {}

  async findAll (): Promise<DevicesEntity[]> {
    return await this.devicesRepo.find();
  }

  async findOne (id: number): Promise<DevicesEntity> {
    return await this.devicesRepo.findOne(id)
  }


  async create (task: DevicesEntity): Promise<DevicesEntity> {
    return await this.devicesRepo.save(task)
  }

  async update(task: DevicesEntity): Promise<UpdateResult> {
    return await this.devicesRepo.update(task.Id, task);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.devicesRepo.delete(id);
  }
}

