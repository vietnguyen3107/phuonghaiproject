import { Injectable } from '@nestjs/common';
import { Datum } from './datum.entity' 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class DatumService {
  constructor(
    @InjectRepository(Datum)
    private readonly datumRepo: Repository<Datum>,
  ) {}

  async findAll (): Promise<Datum[]> {
    return await this.datumRepo.find();
  }

  async findOne (Id: number): Promise<Datum> {
    return await this.datumRepo.findOne(Id)
  }


  async create (task: Datum): Promise<Datum> {
    return await this.datumRepo.save(task)
  }

  async update(task: Datum): Promise<UpdateResult> {
    return await this.datumRepo.update(task.Id, task);
  }

  async delete(Id): Promise<DeleteResult> {
    return await this.datumRepo.delete(Id);
  }
}
