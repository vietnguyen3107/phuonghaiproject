import { Injectable } from '@nestjs/common';
import { UserDevice } from './userdevice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { User } from 'src/user/user.entity';


@Injectable()
export class UserDeviceService {
  constructor(
    @InjectRepository(UserDevice)
    private readonly userDeviceRepo: Repository<UserDevice>,
  ) { }

  async findAll(): Promise<UserDevice[]> {
    return await this.userDeviceRepo.find();
  }

  findOne(id: number): Promise<UserDevice> {
    return this.userDeviceRepo.findOne(id);
  }
  remove(id: number) {
    return `This action removes a #${id} userdevice`;
  }
  
  async create(userDevice: UserDevice): Promise<UserDevice> {
    return await this.userDeviceRepo.save(userDevice)
  }

  async getAllUserDevicesByDevice(deviceSerialNumber: string): Promise<UserDevice[]> {

    const entityManager = getManager();

    let sql = ''
    if (deviceSerialNumber !== 'All') {
      sql = `select * from userdevice 
    where DeviceSerialNumber='${deviceSerialNumber}' 
      `
    }

    const rawData = entityManager.query(sql)

    return rawData

  }

}
