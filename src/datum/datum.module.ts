import { Module } from '@nestjs/common';
import { DatumService } from './datum.service';
import { DatumController } from './datum.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Datum } from './datum.entity';
import { LabModule } from 'src/lab/lab.module';
import { Datum_lastest } from './datum_lastest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Datum, Datum_lastest]), LabModule],
  providers: [DatumService],
  controllers: [DatumController]
})
export class DatumModule {}
