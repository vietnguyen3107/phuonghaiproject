import { Injectable } from '@nestjs/common';
import { User } from './user.entity' 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll (): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findOne (Id: number): Promise<User> {
    return await this.userRepo.findOne(Id)
  }


  async create (task: User): Promise<User> {
    return await this.userRepo.save(task)
  }

  async update(task: User): Promise<UpdateResult> {
    return await this.userRepo.update(task.Id, task);
  }

  async delete(Id): Promise<DeleteResult> {
    return await this.userRepo.delete(Id);
  }
}

