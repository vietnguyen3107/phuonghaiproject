import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { DeleteResult, EntityManager, Repository, UpdateResult } from 'typeorm';
import { CreateUserDevicegroupDeviceDto } from './dto/create-user-devicegroup-device.dto';
import { UserDevicegroupDevice } from './entities/user-devicegroup-device.entity';

@Injectable()
export class UserDevicegroupDeviceService {

  
  constructor(
    @InjectRepository(UserDevicegroupDevice)
    private readonly _repo: Repository<UserDevicegroupDevice>,
    @InjectEntityManager() private entityManager: EntityManager,
  ) {}


  async create (obj: CreateUserDevicegroupDeviceDto, user: User)  {
    try {
      let userDevicegroupDevice = new UserDevicegroupDevice();

      userDevicegroupDevice.Group = obj.Group;
      userDevicegroupDevice.Orderno = obj.Orderno;
      userDevicegroupDevice.Device = obj.Device;

      userDevicegroupDevice.CreatedBy = user.Email;
      userDevicegroupDevice.CreatedDate = new Date();

      const insertresult = await this._repo.insert(userDevicegroupDevice);
      userDevicegroupDevice.Id = insertresult.identifiers[0].Id;

      return {success: true, message: 'success', data: userDevicegroupDevice};
    } catch (error) {
      console.log(error)
      return {success: false, message: error.sqlMessage, data : {code: error.code, message: error.sqlMessage} };
    }
  }

  async update(obj: UserDevicegroupDevice): Promise<UpdateResult> {
    return await this._repo.update(obj.Id, obj);
  }


  async delete(Id: number): Promise<DeleteResult> {
    return await this._repo.delete(Id);
  }


}
