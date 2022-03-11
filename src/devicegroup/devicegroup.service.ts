import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Devicegroup } from './devicegroup.entity';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
@Injectable()
export class DevicegroupService {
    constructor(
        @InjectRepository(Devicegroup)
private readonly devicegroupRepo: Repository <Devicegroup>,
    ){}
    async findAll(): Promise <Devicegroup[]>{
return await this.devicegroupRepo.find()
    }
    async findOne(Id: number): Promise <Devicegroup>{
        return await this.devicegroupRepo.findOne(Id)
    }
    async create (devicegroup: Devicegroup): Promise <Devicegroup>{
        return await this.devicegroupRepo.save(devicegroup)
    }
    async update (devicegroup: Devicegroup): Promise <UpdateResult>{
    return await this. devicegroupRepo.update(devicegroup.Id, devicegroup)
}
async delete(Id): Promise <DeleteResult>{
    return await this.devicegroupRepo.delete(Id)
}
}
