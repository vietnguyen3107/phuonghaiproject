import { Module } from '@nestjs/common';
import { DataLabService } from './data-lab.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLabController } from './data-lab.controller';
import {DataLabEntity} from './data-lab.entity'

@Module({
  imports: [TypeOrmModule.forFeature([DataLabEntity])],
  providers: [DataLabService],
  controllers: [DataLabController]
})
export class DataLabModule {}
