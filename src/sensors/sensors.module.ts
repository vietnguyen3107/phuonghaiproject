import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorsController } from './sensors.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SensorsEntity} from './sensors.entity';
@Module({
  imports: [TypeOrmModule.forFeature([SensorsEntity])],
  providers: [SensorsService],
  controllers: [SensorsController]
})
export class SensorsModule {}
