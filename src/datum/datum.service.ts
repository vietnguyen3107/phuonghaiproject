import { Injectable } from '@nestjs/common';
import { Datum } from './datum.entity' 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult, getManager } from  'typeorm';




@Injectable()
export class DatumService {
  constructor(
    @InjectRepository(Datum)
    private readonly datumRepo: Repository<Datum>,
  ) {}

  async findAll (): Promise<Datum[]> {
    return await this.datumRepo.find();
  }

  async findOne (Id: number): Promise<Datum> {
    return await this.datumRepo.findOne(Id)
  }


  async create (datum: Datum): Promise<Datum> {

    const entityManager = getManager();
    let sql = `select * from datum 
    where SensorType='${datum.SensorType}' and DeviceSerialNumber='${datum.DeviceSerialNumber}' 
    and ReceivedDate='${datum.ReceivedDate}'`

    console.log(sql)
    let rawData = await entityManager.query(sql)

    if (rawData!==null){
      await entityManager.query(`delete from datum 
      where SensorType='${datum.SensorType}' and DeviceSerialNumber='${datum.DeviceSerialNumber}' 
      and ReceivedDate='${datum.ReceivedDate}'`)
    }

    return await this.datumRepo.save(datum)
  }

  async update(task: Datum): Promise<UpdateResult> {
    return await this.datumRepo.update(task.Id, task);
  }

  async delete(Id): Promise<DeleteResult> {
    return await this.datumRepo.delete(Id);
  }

  async getDatumLastHour(sensorType: string, deviceSerialNumber: string): Promise<Datum[]> {
    
    const entityManager = getManager();

    //use convert_tz() function to convert to current vietnam timezone
    //use date() function to extract only date

    let sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum 
    where SensorType='${sensorType}' and DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,12`

    const rawData = entityManager.query(sql)
  
    return rawData

  }

  async getDatumLast24Hours(sensorType: string, deviceSerialNumber: string): Promise<Datum[]> {
    
    const entityManager = getManager();

    //use convert_tz() function to convert to current vietnam timezone
    //use date() function to extract only date

    let sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum 
    where SensorType='${sensorType}' and DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,288`

    const rawData = entityManager.query(sql)
  
    return rawData

  }

  async getDatumLast7Days(sensorType: string, deviceSerialNumber: string): Promise<Datum[]> {
    
    const entityManager = getManager();

    //use convert_tz() function to convert to current vietnam timezone
    //use date() function to extract only date

    let sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum 
    where SensorType='${sensorType}' and DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,2016`

    const rawData = entityManager.query(sql)
  
    return rawData

  }

  async getDatumLast30Days(sensorType: string, deviceSerialNumber: string): Promise<Datum[]> {
    
    const entityManager = getManager();

    //use convert_tz() function to convert to current vietnam timezone
    //use date() function to extract only date

    let sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate  from datum 
    where SensorType='${sensorType}' and DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,8640`

    const rawData = entityManager.query(sql)
  
    return rawData

  }




}
