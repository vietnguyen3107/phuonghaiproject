import { Injectable } from '@nestjs/common';
import { Device } from './device.entity' 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,
  ) {}

  async findAll (): Promise<Device[]> {
    return await this.deviceRepo.find();
  }

  async findOne (Id: number): Promise<Device> {
    return await this.deviceRepo.findOne(Id)
  }


  async create (task: Device): Promise<Device> {
    return await this.deviceRepo.save(task)
  }

  async update(task: Device): Promise<UpdateResult> {
    return await this.deviceRepo.update(task.Id, task);
  }

  async delete(Id): Promise<DeleteResult> {
    return await this.deviceRepo.delete(Id);
  }
}

