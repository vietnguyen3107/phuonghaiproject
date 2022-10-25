import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getManager, Repository, UpdateResult } from 'typeorm';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { UpdateAlarmDto } from './dto/update-alarm.dto';
import { Alarm } from './entities/alarm.entity';

@Injectable()
export class AlarmService {
  constructor(
    @InjectRepository(Alarm)
    private readonly alarmRepo: Repository<Alarm>,
  ) { }



  async findAll() {
    return await this.alarmRepo.find();
  }

  async findByUser(userId : number, pageSize : number, page : number) {

    const entityManager = getManager();
    if(page === null || page === 0){
      page = 1;
    }
    if(pageSize === null || pageSize === 0){
      pageSize = 10;
    }
    const from = (page - 1 )*pageSize;
    const to = +from + +pageSize;

    let sql = ''

      sql = `select a.*
      from alarm a
      inner join userdevice ud on a.DeviceSerialNumber = ud.DeviceSerialNumber

      where User_Id=${userId}
      order by a.CreatedDate DESC  limit ${from},${to}`
  
      return entityManager.query(sql);

    // return this.alarmRepo.createQueryBuilder('al')
    // .innerJoinAndSelect('al.Datum', 'dt')
    // .innerJoin('UserDevice', 'ud', 'ud.DeviceSerialNumber = dt.DeviceSerialNumber')
    // .innerJoin('ud.User', 'user')
    // .where('user.Id = :userId', { userId: userId })
    // .orderBy('a.CreatedDate', 'DESC')
    // .take(pageSize)
    // .skip(from);
  }
  async findOne(id: number) {
    return await this.alarmRepo.findOne(id);
  }
  async create (item: Alarm) {
    try {
      
      const insertresult = await this.alarmRepo.insert(item);
      item.Id = insertresult.identifiers[0].Id;

      return {success: true, data: item};
    } catch (error) {
      console.log(error)
      return {success: false, data : {code: error.code, message: error.sqlMessage} };
    }
  }

  async update(id: number, obj: Alarm): Promise<UpdateResult> {
    return await this.alarmRepo.update(id, obj);
  }

  async remove(Id): Promise<DeleteResult> {
    return await this.alarmRepo.delete(Id);
  }

}
