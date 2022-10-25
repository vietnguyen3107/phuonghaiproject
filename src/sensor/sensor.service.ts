import { Injectable } from '@nestjs/common';
import { Sensor } from './sensor.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(Sensor)
    private readonly sensorRepo: Repository<Sensor>,
  ) { }

  async findAll(): Promise<Sensor[]> {
    return await this.sensorRepo.find();
  }

  async findOne(Id: number): Promise<Sensor> {
    return await this.sensorRepo.findOne(Id)
  }
  async findOneByTypeAndDeviceNumber(sensorType: string, deviceSerialNumber: string): Promise<Sensor> {

    return await this.sensorRepo.findOne({
      where: {
        SensorType: sensorType,
        DeviceSerialNumber: deviceSerialNumber
      },
    });
  }

  async create(task: Sensor): Promise<Sensor> {
    return await this.sensorRepo.save(task)
  }

  async update(task: Sensor): Promise<UpdateResult> {
    return await this.sensorRepo.update(task.Id, task);
  }

  async delete(Id): Promise<DeleteResult> {
    return await this.sensorRepo.delete(Id);
  }
}
