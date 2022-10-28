import { Injectable } from '@nestjs/common';
import { Datum } from './datum.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult, getManager } from 'typeorm';


import * as moment from "moment";
import { Datum_lastest } from './datum_lastest.entity';
import { SensorService } from 'src/sensor/sensor.service';
import { Sensor } from 'src/sensor/sensor.entity';
import { AlarmService } from 'src/alarm/alarm.service';
import { Alarm } from 'src/alarm/entities/alarm.entity';




@Injectable()
export class DatumService {
  constructor(
    @InjectRepository(Datum)
    private readonly datumRepo: Repository<Datum>,

    @InjectRepository(Datum_lastest)
    private readonly datumlastestRepo: Repository<Datum_lastest>,

    private readonly sensorService: SensorService,
    private readonly alarmService: AlarmService,
  ) { }

  async findAll(): Promise<Datum[]> {
    return await this.datumRepo.find();
  }

  async findOne(Id: number): Promise<Datum> {
    return await this.datumRepo.findOne(Id)
  }


  async create(datum: Datum): Promise<any> {

    //check datum data
    let sensor : Sensor;
    let alarmYN : boolean = false;
    sensor = await this.sensorService.findOneByTypeAndDeviceNumber(datum.SensorType, datum.DeviceSerialNumber);
    if(sensor.MinValue && sensor.MaxValue){
      //[min,max]
      if(sensor.MinValue <= sensor.MaxValue){
        //value ngoai khoang [min,max]
        if(!(datum.Value >= sensor.MinValue && datum.Value <= sensor.MaxValue)){
          //save alarm
          alarmYN = true;
        }
      } 
      //(...,max] - [min,...)
      else {
        //value ngoai khoang (-,max] --> [min,+)
        if(!(datum.Value >= sensor.MinValue || datum.Value <= sensor.MaxValue) ){
          //save alarm
          alarmYN = true;

        }
      }
    }

    //insert datum LATEST
    this.datumlastestRepo
    .createQueryBuilder()
    .insert()
    .values(datum)
    .orUpdate({overwrite: ['Value', 'Status', 'ReceivedDate', 'Unit', 'CreatedDate', 'CreatedBy']  })
	  .execute();
    // .upsert([datum], ['DeviceSerialNumber', 'SensorType']);


    let datumObj = await this.datumRepo.findOne({
      where: {
        SensorType: datum.SensorType,
        DeviceSerialNumber: datum.DeviceSerialNumber,
        ReceivedDate: datum.ReceivedDate
      },
    });

    if(datumObj && datumObj !== null){
      datum.Id = datumObj.Id;
      datum.AlarmYN = alarmYN;
      await this.datumRepo.update(datum.Id, datum);

    }else{
      datum.AlarmYN = alarmYN;
      let insertresult = await this.datumRepo.insert(datum);
      datum.Id = insertresult.identifiers[0].Id;
    }

    //insert alarm
    if(alarmYN === true){
      let alarm = new Alarm();
      alarm.Datum = datum;
      alarm.Message = `Dữ liệu ngoài khoảng cho phép!`;
      alarm.DeviceSerialNumber = datum.DeviceSerialNumber;
      alarm.SensorType = datum.SensorType;
      alarm.ReceivedDate = datum.ReceivedDate;
      alarm.MinValue = sensor.MinValue;
      alarm.MaxValue = sensor.MaxValue;
      alarm.Value = datum.Value;

      alarm.CreatedBy = datum.CreatedBy;
      alarm.CreatedDate = new Date();

      await this.alarmService.create(alarm);
    }

      return datum;

  }

  async update(obj: Datum): Promise<UpdateResult> {
    return await this.datumRepo.update(obj.Id, obj);
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
      console.log(sql)
    }
    else {
      sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum 
    where DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,12`
    }
    console.log(sql)
    const rawData = entityManager.query(sql)

    return rawData

  }

  async getDatumLast24Hours(sensorType: string, deviceSerialNumber: string): Promise<Datum[]> {

    const entityManager = getManager();

    //use convert_tz() function to convert to current vietnam timezone
    //use date() function to extract only date

    let sql = ''
    if (sensorType !== 'All') {
      sql = `select DeviceSerialNumber, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate, Value, SensorType, Unit, Status from datum 
    where SensorType='${sensorType}' and DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,288`
      // console.log(sql)
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

  async getStatisticData(startDate: string, endDate: string): Promise<any> {

    const entityManager = getManager();
    const stDate = startDate + "T00:00:00"
    const enDate = endDate + "T23:59:00"

    let sql = `select DATE_FORMAT(convert_tz(ReceivedDate, '+0:00', '+7:00'), '%Y-%m-%d') as DateOnly, 
    Max(SensorType) as SensorType, Max(DeviceSerialNumber) as DeviceSerialNumber,
    AVG(Value) as Average, MIN(Value) as Minimum, MAX(Value) as Maximum
    from datum 
    where ReceivedDate between '${stDate}' and '${enDate}' 
   group by DateOnly, SensorType, DeviceSerialNumber 
   order by  DeviceSerialNumber, SensorType, DateOnly`
    // console.log(sql)
    const rawData = await entityManager.query(sql)
    // console.log(rawData)

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
    // console.log(newData)
    return newData

  }



  async getLastestDataByDeviceOld(deviceSerialNumber: string): Promise<Datum[]> {

    const entityManager = getManager();

    //use convert_tz() function to convert to current vietnam timezone
    //use date() function to extract only date

    // let sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate  from datum 
    // where DeviceSerialNumber='${deviceSerialNumber}' 
    // order by ReceivedDate DESC limit 0,1`

    let sql = ''

    if (deviceSerialNumber && deviceSerialNumber !== '') {
      sql = `select t.SensorType, t.DeviceSerialNumber, t.ReceivedDate, t.Value, t.Status, t.Unit
      from datum t
      inner join (
          select SensorType, DeviceSerialNumber, max(ReceivedDate) as MaxDate
          from datum
          where DeviceSerialNumber = '${deviceSerialNumber}'
          group by SensorType, DeviceSerialNumber
      ) tm on t.SensorType = tm.SensorType and t.DeviceSerialNumber=tm.DeviceSerialNumber 
      and t.ReceivedDate = tm.MaxDate
      and t.DeviceSerialNumber = '${deviceSerialNumber}'`
    }
    else{
      sql = `select t.SensorType, t.DeviceSerialNumber, t.ReceivedDate, t.Value, t.Status, t.Unit
      from datum t
      inner join (
          select SensorType, DeviceSerialNumber, max(ReceivedDate) as MaxDate
          from datum
          group by SensorType, DeviceSerialNumber
      ) tm on t.SensorType = tm.SensorType and t.DeviceSerialNumber=tm.DeviceSerialNumber 
      and t.ReceivedDate = tm.MaxDate`
    }

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

    let sql = ''

    if (deviceSerialNumber && deviceSerialNumber !== '') {
      sql = `select t.SensorType, t.DeviceSerialNumber, t.ReceivedDate, t.Value, t.Status, t.Unit
      from datum_lastest t
      where  t.DeviceSerialNumber = '${deviceSerialNumber}'`
    }
    else{
      sql = `select t.SensorType, t.DeviceSerialNumber, t.ReceivedDate, t.Value, t.Status, t.Unit
      from datum_lastest t
      `
    }


    const rawData = entityManager.query(sql)
    return rawData

  }


  async getLastestDataByAllDevices2(userId: number): Promise<any> {

    const entityManager = getManager();

    let sql = `select dt.SensorType, dt.DeviceSerialNumber, dt.ReceivedDate, dt.Value, dt.Status, dt.Unit
    from datum_lastest dt
    inner join device d on d.SerialNumber= dt.DeviceSerialNumber
    inner join userdevice ud on ud.Device_Id = d.Id
    where ud.User_Id = ${userId}
    `

    const rawData = await entityManager.query(sql)

    if (rawData.length === 0 || rawData === null) return null

    var newData = { name: "root", children: [] }, levels = ["DeviceSerialNumber"];

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
          depthCursor.push({ name: d['DeviceSerialNumber'], Description: d['Description'] ,DateSync: d['DateSync'], FriendlyName: d['FriendlyName'], Type: d['Type'], Model: d['Model'], children: [] });
          index = depthCursor.length - 1;
        }
        // Now reference the new child array as we go deeper into the tree
        depthCursor = depthCursor[index].children;
        // This is a leaf, so add the last element to the specified branch
        if (depth === levels.length - 1) depthCursor.push({ SensorType: d.SensorType, Value: d.Value });
      });
    });

    //console.log(newData)
   
    return newData

  }


  async getStatisticDataByDevice(deviceSerialNumber: string, startDate: string, endDate: string): Promise<any> {

    const entityManager = getManager();
    const stDate = startDate + "T00:00:00"
    const enDate = endDate + "T23:59:00"

    let sql = `select DATE_FORMAT(convert_tz(ReceivedDate, '+0:00', '+7:00'), '%Y-%m-%d') as DateOnly, 
    Max(SensorType) as SensorType, Max(DeviceSerialNumber) as DeviceSerialNumber,
    AVG(Value) as Average, MIN(Value) as Minimum, MAX(Value) as Maximum
    from datum 
    where DeviceSerialNumber='${deviceSerialNumber}' and ReceivedDate between '${stDate}' and '${enDate}' 
   group by DateOnly, SensorType, DeviceSerialNumber 
   order by  DeviceSerialNumber, SensorType, DateOnly`

   //console.log(sql)

    const rawData = await entityManager.query(sql)

    if (rawData.length === 0 || rawData === null) return null

    var newData = { name: "root", children: [] }, levels = ["DeviceSerialNumber", "SensorType"];

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
        if (depth === levels.length - 1) depthCursor.push({ DateOnly: d.DateOnly, AVG: d.Average, MIN: d.Minimum, MAX: d.Maximum });
      });
    });
    // console.log(newData)
    let newnewData = newData.children[0].children
    let returnjson = []

    for (let i = 0; i < newnewData.length; i++) {
      returnjson.push({ "sensorType": newnewData[i].name, "data": newnewData[i].children })
    }

    return returnjson

  }

  async getStatisticDataBySensor(deviceSerialNumber: string, startDate: string, endDate: string): Promise<any> {

    const entityManager = getManager();
    //const stDate = startDate + "T16:59:00"
    const mStartDate = moment(startDate, 'YYYY-MM-DD')
    mStartDate.subtract(1, 'days').toDate()
    const newStartDate = mStartDate.format('YYYY-MM-DD')

    const stDate = newStartDate + "T17:00:00"

    const enDate = endDate + "T16:59:00"


    let sql = `select  
    Max(SensorType) as SensorType, Max(DeviceSerialNumber) as DeviceSerialNumber,
    AVG(Value) as Average, MIN(Value) as Minimum, MAX(Value) as Maximum
    from datum 
    where DeviceSerialNumber='${deviceSerialNumber}' and ReceivedDate between '${stDate}' and '${enDate}' 
   group by  SensorType, DeviceSerialNumber 
   order by  SensorType, DeviceSerialNumber`

    //  console.log(sql)

    const rawData = await entityManager.query(sql)

    if (rawData.length === 0 || rawData === null) return null

    var newData = { name: "root", children: [] },
      levels = ["DeviceSerialNumber", "SensorType"];

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
        if (depth === levels.length - 1) depthCursor.push({ AVG: d.Average, MIN: d.Minimum, MAX: d.Maximum });
      });
    });

    let newnewData = newData.children[0].children
    let newObj = {}

    for (let i = 0; i < newnewData.length; i++) {
      let minObj = {}
      minObj["Min"] = newnewData[i].children[0].MIN
      let maxObj = {}
      maxObj["Max"] = newnewData[i].children[0].MAX
      let avgObj = {}
      avgObj["Avg"] = newnewData[i].children[0].AVG

      newObj[newnewData[i].name] = Object.assign({}, minObj, maxObj, avgObj)
    }

    // console.log(newObj)

    return newObj

  }
  async getDataByDate(deviceSerialNumber: string, startDate: string, endDate: string): Promise<Datum[]> {

    const entityManager = getManager();

    const mStartDate = moment(startDate, 'YYYY-MM-DD')
    mStartDate.subtract(1, 'days').toDate()
    const newStartDate = mStartDate.format('YYYY-MM-DD')

    const stDate = newStartDate + "T17:00:00"

    const enDate = endDate + "T16:59:00"

    // const stDate = startDate + "T00:00:00"
    // const enDate = endDate + "T23:59:00"

    //let sql =`select convert_tz(ReceivedDate, '+0:00', '+7:00') as Date, DeviceSerialNumber, SensorType, Value, Unit, Status

    let sql = `select DATE_FORMAT(convert_tz(ReceivedDate, '+0:00', '+7:00'), '%Y-%m-%d %H:%i') as Date, DeviceSerialNumber, SensorType, Value, Unit, Status

  from datum
  where DeviceSerialNumber='${deviceSerialNumber}' and ReceivedDate between '${stDate}' and '${enDate}' 
  order by DeviceSerialNumber, SensorType, ReceivedDate`
    // console.log(sql)
    const rawData = await entityManager.query(sql)
    return rawData

  }
}


