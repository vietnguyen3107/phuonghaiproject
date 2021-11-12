import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import {DevicesEntity} from './devices.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DevicesEntity])],
  providers: [DevicesService],
  controllers: [DevicesController]
})
export class DevicesModule {}
