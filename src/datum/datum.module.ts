import { Module } from '@nestjs/common';
import { DatumService } from './datum.service';
import { DatumController } from './datum.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Datum } from './datum.entity';
import { LabModule } from 'src/lab/lab.module';
import { Datum_lastest } from './datum_lastest.entity';
import { SensorService } from 'src/sensor/sensor.service';
import { SensorModule } from 'src/sensor/sensor.module';
import { Sensor } from 'src/sensor/sensor.entity';
import { Alarm } from 'src/alarm/entities/alarm.entity';
import { AlarmService } from 'src/alarm/alarm.service';

@Module({
  imports: [TypeOrmModule.forFeature([Datum, Datum_lastest, Sensor, Alarm]), LabModule, SensorModule],
  providers: [DatumService, SensorService, AlarmService],
  controllers: [DatumController]
})
export class DatumModule {}
