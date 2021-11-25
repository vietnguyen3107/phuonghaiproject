import { Injectable } from '@nestjs/common';
import { Datum } from './datum.entity' 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult, getManager } from  'typeorm';
import { LargeNumberLike } from 'crypto';
import { Lab } from 'src/lab/lab.entity';
import { LabService } from 'src/lab/lab.service';




@Injectable()
export class DatumService {
  constructor(
    @InjectRepository(Datum)
    private readonly datumRepo: Repository<Datum>,

    private readonly labService: LabService,
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

    let sql = ''
    if (sensorType!=='All'){
       sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum 
    where SensorType='${sensorType}' and DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,12`
    }
    else{
       sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum 
    where DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,12`
    }

    const rawData = entityManager.query(sql)
  
    return rawData

  }

  async getDatumLast24Hours(sensorType: string, deviceSerialNumber: string): Promise<Datum[]> {
    
    const entityManager = getManager();

    //use convert_tz() function to convert to current vietnam timezone
    //use date() function to extract only date

    let sql = ''
    if (sensorType!=='All'){
       sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum 
    where SensorType='${sensorType}' and DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,288`
    }
    else{
       sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum 
    where DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,288`
    }

    const rawData = entityManager.query(sql)
  
    return rawData

  }

  async getDatumLast7Days(sensorType: string, deviceSerialNumber: string): Promise<Datum[]> {
    
    const entityManager = getManager();

    //use convert_tz() function to convert to current vietnam timezone
    //use date() function to extract only date

    let sql = ''
    if (sensorType!=='All'){
       sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum 
    where SensorType='${sensorType}' and DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,2016`
    }
    else{
       sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum 
    where DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,2016`
    }

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

  async getEverageData(sensorType: string,deviceSerialNumber: string, startDate: string, endDate: string): Promise<Datum[]> {
      
    const entityManager = getManager();
    const stDate = startDate + "T00:00:00"
    const enDate = endDate + "T23:59:00"
    //use convert_tz() function to convert to current vietnam timezone
    //use date() function to extract only date

    // let sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate  from datum 
    // where SensorType='${sensorType}' and ReceivedDate='${receivedDate}' between createdAt >= 'after' AND createdAt < 'before'
 
    // order by ReceivedDate DESC limit 0,8640`

    let sql = `select DATE(convert_tz(ReceivedDate, '+0:00', '+7:00')) as DateOnly, AVG(Value) from datum 
    where SensorType='${sensorType}' and DeviceSerialNumber='${deviceSerialNumber}' 
   and ReceivedDate between '${stDate}' and '${enDate}' 
   group by DateOnly`
    console.log(sql)
    const rawData = entityManager.query(sql)
  
    return rawData

  }

  async getLastestDataByDevice(deviceSerialNumber: string): Promise<Datum[]> {
    
    const entityManager = getManager();

    //use convert_tz() function to convert to current vietnam timezone
    //use date() function to extract only date

    // let sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate  from datum 
    // where DeviceSerialNumber='${deviceSerialNumber}' 
    // order by ReceivedDate DESC limit 0,1`

    let sql = `select t.SensorType, t.DeviceSerialNumber, t.ReceivedDate, t.Value, t.Status, t.Unit
    from datum t
    inner join (
        select SensorType, DeviceSerialNumber, max(ReceivedDate) as MaxDate
        from datum
        group by SensorType, DeviceSerialNumber
    ) tm on t.SensorType = tm.SensorType and t.DeviceSerialNumber=tm.DeviceSerialNumber 
    and t.ReceivedDate = tm.MaxDate`

    if (deviceSerialNumber && deviceSerialNumber!==''){
      sql += ` and t.DeviceSerialNumber = '${deviceSerialNumber}'`
    }

    console.log(sql)

    const rawData = entityManager.query(sql)
  
    return rawData

  }



  

  // async getAllLatestData(LabSerialNumber: string): Promise<Lab> {
    
  //   const entityManager = getManager();

  //   let sql = `select t.SensorType, t.DeviceSerialNumber, t.ReceivedDate, t.Value, t.Status
  //   from datum t
  //   inner join (
  //       select SensorType, DeviceSerialNumber, max(ReceivedDate) as MaxDate
  //       from datum
  //       group by SensorType, DeviceSerialNumber
  //   ) tm on t.SensorType = tm.SensorType and t.DeviceSerialNumber=tm.DeviceSerialNumber and t.ReceivedDate = tm.MaxDate`

  //   console.log(sql)
  //   const rawData = entityManager.query(sql)
  //   const dict = {}
  //   rawData.forEach(row => {
      
  //   });
  
  //   const lab = await this.labService.findOneBySerialNumber(LabSerialNumber)

  //   lab.Devices.forEach(d=>{
  //     d.Sensors.forEach(s => {
  //       s.LatestDatum = rawData
  //     });)
  //   })

   
  
  //   return lab

  // }



}
