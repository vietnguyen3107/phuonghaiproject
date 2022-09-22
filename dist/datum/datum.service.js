"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatumService = void 0;
const common_1 = require("@nestjs/common");
const datum_entity_1 = require("./datum.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("typeorm");
const lab_entity_1 = require("../lab/lab.entity");
const lab_service_1 = require("../lab/lab.service");
const moment = require("moment");
const datum_lastest_entity_1 = require("./datum_lastest.entity");
let DatumService = class DatumService {
    constructor(datumRepo, datumlastestRepo, labService) {
        this.datumRepo = datumRepo;
        this.datumlastestRepo = datumlastestRepo;
        this.labService = labService;
    }
    async findAll() {
        return await this.datumRepo.find();
    }
    async findOne(Id) {
        return await this.datumRepo.findOne(Id);
    }
    async create(datum) {
        this.datumlastestRepo
            .createQueryBuilder()
            .insert()
            .values(datum)
            .orUpdate({ overwrite: ['Value', 'Status', 'ReceivedDate', 'Unit', 'CreatedDate', 'CreatedBy'] })
            .execute();
        let datumObj = await this.datumRepo.findOne({
            where: {
                SensorType: datum.SensorType,
                DeviceSerialNumber: datum.DeviceSerialNumber,
                ReceivedDate: datum.ReceivedDate
            },
        });
        if (datumObj && datumObj !== null) {
            datum.Id = datumObj.Id;
            await this.datumRepo.update(datum.Id, datum);
            return datum;
        }
        else {
            return await this.datumRepo.insert(datum);
        }
        return await this.datumRepo
            .createQueryBuilder()
            .insert()
            .values(datum)
            .orUpdate({ overwrite: ['Value', 'Status'], conflict_target: ['DeviceSerialNumber', 'SensorType', 'ReceivedDate'] })
            .execute();
    }
    async update(task) {
        return await this.datumRepo.update(task.Id, task);
    }
    async delete(Id) {
        return await this.datumRepo.delete(Id);
    }
    async getDatumLastHour(sensorType, deviceSerialNumber) {
        const entityManager = (0, typeorm_3.getManager)();
        let sql = '';
        if (sensorType !== 'All') {
            sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum 
    where SensorType='${sensorType}' and DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,12`;
            console.log(sql);
        }
        else {
            sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum 
    where DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,12`;
        }
        console.log(sql);
        const rawData = entityManager.query(sql);
        return rawData;
    }
    async getDatumLast24Hours(sensorType, deviceSerialNumber) {
        const entityManager = (0, typeorm_3.getManager)();
        let sql = '';
        if (sensorType !== 'All') {
            sql = `select DeviceSerialNumber, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate, Value, SensorType, Unit, Status from datum 
    where SensorType='${sensorType}' and DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,288`;
        }
        else {
            sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum 
    where DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,288`;
        }
        const rawData = entityManager.query(sql);
        return rawData;
    }
    async getDatumLast7Days(sensorType, deviceSerialNumber) {
        const entityManager = (0, typeorm_3.getManager)();
        let sql = '';
        if (sensorType !== 'All') {
            sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum 
    where SensorType='${sensorType}' and DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,2016`;
        }
        else {
            sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum 
    where DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,2016`;
        }
        const rawData = entityManager.query(sql);
        return rawData;
    }
    async getDatumLast30Days(sensorType, deviceSerialNumber) {
        const entityManager = (0, typeorm_3.getManager)();
        let sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate  from datum 
    where SensorType='${sensorType}' and DeviceSerialNumber='${deviceSerialNumber}' 
    order by ReceivedDate DESC limit 0,8640`;
        const rawData = entityManager.query(sql);
        return rawData;
    }
    async getStatisticData(startDate, endDate) {
        const entityManager = (0, typeorm_3.getManager)();
        const stDate = startDate + "T00:00:00";
        const enDate = endDate + "T23:59:00";
        let sql = `select DATE_FORMAT(convert_tz(ReceivedDate, '+0:00', '+7:00'), '%Y-%m-%d') as DateOnly, 
    Max(SensorType) as SensorType, Max(DeviceSerialNumber) as DeviceSerialNumber,
    AVG(Value) as Average, MIN(Value) as Minimum, MAX(Value) as Maximum
    from datum 
    where ReceivedDate between '${stDate}' and '${enDate}' 
   group by DateOnly, SensorType, DeviceSerialNumber 
   order by  DeviceSerialNumber, SensorType, DateOnly`;
        const rawData = await entityManager.query(sql);
        var newData = { name: "root", children: [] }, levels = ["DeviceSerialNumber", "SensorType", "DateOnly"];
        rawData.forEach(function (d) {
            var depthCursor = newData.children;
            levels.forEach(function (property, depth) {
                var index;
                depthCursor.forEach(function (child, i) {
                    if (d[property] == child.name)
                        index = i;
                });
                if (isNaN(index)) {
                    depthCursor.push({ name: d[property], children: [] });
                    index = depthCursor.length - 1;
                }
                depthCursor = depthCursor[index].children;
                if (depth === levels.length - 1)
                    depthCursor.push({ DateOnly: d.DataOnly, AVG: d.Average, MIN: d.Minimum, MAX: d.Maximum });
            });
        });
        return newData;
    }
    async getLastestDataByDevice(deviceSerialNumber) {
        const entityManager = (0, typeorm_3.getManager)();
        let sql = '';
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
      and t.DeviceSerialNumber = '${deviceSerialNumber}'`;
        }
        else {
            sql = `select t.SensorType, t.DeviceSerialNumber, t.ReceivedDate, t.Value, t.Status, t.Unit
      from datum t
      inner join (
          select SensorType, DeviceSerialNumber, max(ReceivedDate) as MaxDate
          from datum
          group by SensorType, DeviceSerialNumber
      ) tm on t.SensorType = tm.SensorType and t.DeviceSerialNumber=tm.DeviceSerialNumber 
      and t.ReceivedDate = tm.MaxDate`;
        }
        const rawData = entityManager.query(sql);
        return rawData;
    }
    async getLastestDataByAllDevices2(userId) {
        const entityManager = (0, typeorm_3.getManager)();
        let sql = `select dt.SensorType, dt.DeviceSerialNumber, dt.ReceivedDate, dt.Value, dt.Status, dt.Unit
    from datum_lastest dt
    inner join device d on d.SerialNumber= dt.DeviceSerialNumber
    inner join userdevice ud on ud.Device_Id = d.Id
    where ud.User_Id = ${userId}
    `;
        const rawData = await entityManager.query(sql);
        if (rawData.length === 0 || rawData === null)
            return null;
        var newData = { name: "root", children: [] }, levels = ["DeviceSerialNumber"];
        rawData.forEach(function (d) {
            var depthCursor = newData.children;
            levels.forEach(function (property, depth) {
                var index;
                depthCursor.forEach(function (child, i) {
                    if (d[property] == child.name)
                        index = i;
                });
                if (isNaN(index)) {
                    depthCursor.push({ name: d['DeviceSerialNumber'], Description: d['Description'], DateSync: d['DateSync'], FriendlyName: d['FriendlyName'], Type: d['Type'], Model: d['Model'], children: [] });
                    index = depthCursor.length - 1;
                }
                depthCursor = depthCursor[index].children;
                if (depth === levels.length - 1)
                    depthCursor.push({ SensorType: d.SensorType, Value: d.Value });
            });
        });
        return newData;
    }
    async getStatisticDataByDevice(deviceSerialNumber, startDate, endDate) {
        const entityManager = (0, typeorm_3.getManager)();
        const stDate = startDate + "T00:00:00";
        const enDate = endDate + "T23:59:00";
        let sql = `select DATE_FORMAT(convert_tz(ReceivedDate, '+0:00', '+7:00'), '%Y-%m-%d') as DateOnly, 
    Max(SensorType) as SensorType, Max(DeviceSerialNumber) as DeviceSerialNumber,
    AVG(Value) as Average, MIN(Value) as Minimum, MAX(Value) as Maximum
    from datum 
    where DeviceSerialNumber='${deviceSerialNumber}' and ReceivedDate between '${stDate}' and '${enDate}' 
   group by DateOnly, SensorType, DeviceSerialNumber 
   order by  DeviceSerialNumber, SensorType, DateOnly`;
        const rawData = await entityManager.query(sql);
        if (rawData.length === 0 || rawData === null)
            return null;
        var newData = { name: "root", children: [] }, levels = ["DeviceSerialNumber", "SensorType"];
        rawData.forEach(function (d) {
            var depthCursor = newData.children;
            levels.forEach(function (property, depth) {
                var index;
                depthCursor.forEach(function (child, i) {
                    if (d[property] == child.name)
                        index = i;
                });
                if (isNaN(index)) {
                    depthCursor.push({ name: d[property], children: [] });
                    index = depthCursor.length - 1;
                }
                depthCursor = depthCursor[index].children;
                if (depth === levels.length - 1)
                    depthCursor.push({ DateOnly: d.DateOnly, AVG: d.Average, MIN: d.Minimum, MAX: d.Maximum });
            });
        });
        let newnewData = newData.children[0].children;
        let returnjson = [];
        for (let i = 0; i < newnewData.length; i++) {
            returnjson.push({ "sensorType": newnewData[i].name, "data": newnewData[i].children });
        }
        return returnjson;
    }
    async getStatisticDataBySensor(deviceSerialNumber, startDate, endDate) {
        const entityManager = (0, typeorm_3.getManager)();
        const mStartDate = moment(startDate, 'YYYY-MM-DD');
        mStartDate.subtract(1, 'days').toDate();
        const newStartDate = mStartDate.format('YYYY-MM-DD');
        const stDate = newStartDate + "T17:00:00";
        const enDate = endDate + "T16:59:00";
        let sql = `select  
    Max(SensorType) as SensorType, Max(DeviceSerialNumber) as DeviceSerialNumber,
    AVG(Value) as Average, MIN(Value) as Minimum, MAX(Value) as Maximum
    from datum 
    where DeviceSerialNumber='${deviceSerialNumber}' and ReceivedDate between '${stDate}' and '${enDate}' 
   group by  SensorType, DeviceSerialNumber 
   order by  SensorType, DeviceSerialNumber`;
        const rawData = await entityManager.query(sql);
        if (rawData.length === 0 || rawData === null)
            return null;
        var newData = { name: "root", children: [] }, levels = ["DeviceSerialNumber", "SensorType"];
        rawData.forEach(function (d) {
            var depthCursor = newData.children;
            levels.forEach(function (property, depth) {
                var index;
                depthCursor.forEach(function (child, i) {
                    if (d[property] == child.name)
                        index = i;
                });
                if (isNaN(index)) {
                    depthCursor.push({ name: d[property], children: [] });
                    index = depthCursor.length - 1;
                }
                depthCursor = depthCursor[index].children;
                if (depth === levels.length - 1)
                    depthCursor.push({ AVG: d.Average, MIN: d.Minimum, MAX: d.Maximum });
            });
        });
        let newnewData = newData.children[0].children;
        let newObj = {};
        for (let i = 0; i < newnewData.length; i++) {
            let minObj = {};
            minObj["Min"] = newnewData[i].children[0].MIN;
            let maxObj = {};
            maxObj["Max"] = newnewData[i].children[0].MAX;
            let avgObj = {};
            avgObj["Avg"] = newnewData[i].children[0].AVG;
            newObj[newnewData[i].name] = Object.assign({}, minObj, maxObj, avgObj);
        }
        return newObj;
    }
    async getDataByDate(deviceSerialNumber, startDate, endDate) {
        const entityManager = (0, typeorm_3.getManager)();
        const mStartDate = moment(startDate, 'YYYY-MM-DD');
        mStartDate.subtract(1, 'days').toDate();
        const newStartDate = mStartDate.format('YYYY-MM-DD');
        const stDate = newStartDate + "T17:00:00";
        const enDate = endDate + "T16:59:00";
        let sql = `select DATE_FORMAT(convert_tz(ReceivedDate, '+0:00', '+7:00'), '%Y-%m-%d %H:%i') as Date, DeviceSerialNumber, SensorType, Value, Unit, Status

  from datum
  where DeviceSerialNumber='${deviceSerialNumber}' and ReceivedDate between '${stDate}' and '${enDate}' 
  order by DeviceSerialNumber, SensorType, ReceivedDate`;
        const rawData = await entityManager.query(sql);
        return rawData;
    }
};
DatumService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(datum_entity_1.Datum)),
    __param(1, (0, typeorm_1.InjectRepository)(datum_lastest_entity_1.Datum_lastest)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        lab_service_1.LabService])
], DatumService);
exports.DatumService = DatumService;
//# sourceMappingURL=datum.service.js.map