import { Injectable } from '@nestjs/common';
import { Device } from './device.entity' 
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, EntityManager } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';
import { Sensor } from 'src/sensor/sensor.entity';


@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,
    @InjectEntityManager() private entityManager: EntityManager,
  ) {}

  async findAll (): Promise<Device[]> {
    return await this.deviceRepo.find();
  }

  async findDevicesByUser (userId: number) {

    try {
         return this.entityManager
    .createQueryBuilder(Device, "d")
    .innerJoin("d.userDevices", "ud")
    .leftJoinAndSelect("d.Sensors", "s")
    .where("ud.User_Id= :userid", { userid: userId })
    .getMany();
    } catch (error) {
      return {
        success: false,
        data: error
      }
    }
 
    // const entityManager = getManager();

    // const sql = `select device.* from device 

    //  inner join userdevice where device.Id=userdevice.Device_Id
    //  and userdevice.User_Id=${userId}`

    // const rawData = entityManager.query(sql)

    // return rawData
    
  }

  async findOne (Id: number): Promise<Device> {
    return await this.deviceRepo.findOne({
      where: {
        Id: Id
      },
      relations: ["Sensors"]
    })
  }

  async findOneBySerialNumber (SerialNumber: string): Promise<Device> {
    return await this.deviceRepo.findOne({
      where: {
        SerialNumber: SerialNumber
      },
      relations: ["Sensors"]
    })
  }
  async create (task: Device)  {
    try {
      
      const insertresult = await this.deviceRepo.insert(task);
      task.Id = insertresult.identifiers[0].Id;

      return {success: true, message: 'success', data: task};
    } catch (error) {
      console.log(error)
      return {success: false, message: error.sqlMessage, data : {code: error.code, message: error.sqlMessage} };
    }
  }

  async update(task: Device): Promise<UpdateResult> {
    return await this.deviceRepo.update(task.Id, task);
  }

  async delete(Id): Promise<DeleteResult> {
    return await this.deviceRepo.delete(Id);
  }


}

