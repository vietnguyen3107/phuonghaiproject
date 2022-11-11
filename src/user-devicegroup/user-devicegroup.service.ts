import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { DeleteResult, EntityManager, Repository, UpdateResult } from 'typeorm';
import { CreateUserDevicegroupDto } from './dto/create-user-devicegroup.dto';
import { UserDevicegroup } from './entities/user-devicegroup.entity';

@Injectable()
export class UserDevicegroupService {

  constructor(
    @InjectRepository(UserDevicegroup)
    private readonly _repo: Repository<UserDevicegroup>,
    @InjectEntityManager() private entityManager: EntityManager,
  ) {}

  async create (obj: CreateUserDevicegroupDto, user: User)  {
    try {
      let userDevicegroup = new UserDevicegroup();
      userDevicegroup.Name = obj.Name;
      userDevicegroup.Description = obj.Description;
      userDevicegroup.Orderno = obj.Orderno;
      userDevicegroup.User = user;

      userDevicegroup.CreatedBy = user.Email;
      userDevicegroup.CreatedDate = new Date();

      const insertresult = await this._repo.insert(userDevicegroup);
      userDevicegroup.Id = insertresult.identifiers[0].Id;

      return {success: true, message: 'success', data: userDevicegroup};
    } catch (error) {
      console.log(error)
      return {success: false, message: error.sqlMessage, data : {code: error.code, message: error.sqlMessage} };
    }
  }

  async update(obj: UserDevicegroup): Promise<UpdateResult> {
    return await this._repo.update(obj.Id, obj);
  }


  async delete(Id: number): Promise<DeleteResult> {
    return await this._repo.delete(Id);
  }


  
  async findAllByUser(user: User): Promise<UserDevicegroup[]> {
    return await this._repo.find(
      {
        // relations: ['User'],
        where: {
          'User': { Id: user.Id},
        },
      }
    );
  }

  findOne(Id: number): Promise<UserDevicegroup> {
    return this._repo.findOne({
      relations: ['Devices', 'Devices.Device'],
      where : {
        Id: Id
      }
    });
  }

}
