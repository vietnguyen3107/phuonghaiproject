import { Injectable } from '@nestjs/common';
import { Datum } from './datum.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult, getManager } from 'typeorm';
import { LargeNumberLike } from 'crypto';
import { Lab } from 'src/lab/lab.entity';
import { LabService } from 'src/lab/lab.service';




@Injectable()
export class DatumService {
  constructor(
    @InjectRepository(Datum)
    private readonly datumRepo: Repository<Datum>,

    private readonly labService: LabService,
  ) { }

  async findAll(): Promise<Datum[]> {
    return await this.datumRepo.find();
  }

  async findOne(Id: number): Promise<Datum> {
    return await this.datumRepo.findOne(Id)
  }


  async create(datum: Datum): Promise<Datum> {

    const entityManager = getManager();
    let sql = `select * from datum 
    where SensorType='${datum.SensorType}' and DeviceSerialNumber='${datum.DeviceSerialNumber}' 
    and ReceivedDate='${datum.ReceivedDate}'`

    console.log(sql)
    let rawData = await entityManager.query(sql)

    if (rawData !== null) {
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
    if (sensorType !== 'All') {
      sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum 
    where SensorType='${sensorType}' and DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,12`
    }
    else {
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
    if (sensorType !== 'All') {
      sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum 
    where SensorType='${sensorType}' and DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,288`
    }
    else {
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
    if (sensorType !== 'All') {
      sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum 
    where SensorType='${sensorType}' and DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,2016`
    }
    else {
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

  async getStatiscalData( startDate: string, endDate: string): Promise<any> {

    const entityManager = getManager();
    const stDate = startDate + "T00:00:00"
    const enDate = endDate + "T23:59:00"

    let sql = `select DATE_FORMAT(convert_tz(ReceivedDate, '+0:00', '+7:00'), '%Y-%m-%d') as DateOnly, 
    Max(SensorType) as SensorType, Max(DeviceSerialNumber) as DeviceSerialNumber,
    AVG(Value) as Average, MIN(Value) as Minimum, MAX(Value) as Maximum
    from datum 
    where ReceivedDate between '${stDate}' and '${enDate}' 
   group by DateOnly, SensorType, DeviceSerialNumber 
   order by  DeviceSerialNumber, SensorType`
  
    const rawData = await entityManager.query(sql)

    var newData = { name: "root", children: [] },
      levels = ["DeviceSerialNumber", "SensorType", "DateOnly"];

    // For each data row, loop through the expected levels traversing the output tree
    rawData.forEach(function (d) {
      // Keep this as a reference to the current level
      var depthCursor = newData.children;
      // Go down one level at a time
      levels.forEach(function (property, depth) {

        // Look to see if a branch has already been created
        var index;
        depthCursor.forEach(function (child, i) {
          if (d[property] == child.name) index = i;
        });
        // Add a branch if it isn't there
        if (isNaN(index)) {
          depthCursor.push({ name: d[property], children: [] });
          index = depthCursor.length - 1;
        }
        // Now reference the new child array as we go deeper into the tree
        depthCursor = depthCursor[index].children;
        // This is a leaf, so add the last element to the specified branch
        if (depth === levels.length - 1) depthCursor.push({ DateOnly: d.DataOnly, AVG: d.Average, MIN: d.Minimum, MAX: d.Maximum });
      });
    });

    return newData

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

    if (deviceSerialNumber && deviceSerialNumber !== '') {
      sql += ` and t.DeviceSerialNumber = '${deviceSerialNumber}'`
    }

    const rawData = entityManager.query(sql)

    return rawData

  }

}
  // console.log(JSON.stringify(rawData))

    //     const jsonstr = await JSON.stringify(rawData)

    //     const json = await JSON.parse(jsonstr)
    //     let keys = { DeviceSerialNumber: 'sensors', SensorType: 'Value' } // or more if required
    //     let result = []
    //     let temp = { _: result };

    //     json.forEach(function (object) {
    //     Object.keys(keys).reduce(function (level, key) {
    //         if (!level[object[key]]) {
    //             level[object[key]] = { _: [] };
    //             level._.push({ [key]: object[key], [keys[key]]: level[object[key]]._ });
    //         }
    //         return level[object[key]];
    //     }, temp)._.push({ SensorType: object.SensorType, ReceivedDate: object.ReceivedDate, Value: object.Value, Status: object.Status, Unit: object.Unit });
    // });
