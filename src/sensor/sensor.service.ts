import { Injectable } from '@nestjs/common';
import { Sensor } from './sensor.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { DeviceService } from 'src/device/device.service';
import { Device } from 'src/device/device.entity';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(Sensor)
    private readonly sensorRepo: Repository<Sensor>,
    private deviceService : DeviceService
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

  async create(obj: Sensor): Promise<any> {
    const device = await this.deviceService.findOneBySerialNumber(obj.DeviceSerialNumber);

    if(!device){
      return {success: false, message: "DeviceSerialNumber: " +obj.DeviceSerialNumber+ " không tồn tại trong hệ thống!", data: obj};
    }
    obj.Device = device;

    obj.Device.Sensors = [];

    const result = await this.sensorRepo.save(obj);


      return {success: true, message: "Thêm Sensor thành công!", data: result};
  }

  async update(task: Sensor): Promise<UpdateResult> {
    return await this.sensorRepo.update(task.Id, task);
  }

  async delete(Id): Promise<DeleteResult> {
    return await this.sensorRepo.delete(Id);
  }
}
