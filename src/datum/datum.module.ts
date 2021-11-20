import { Module } from '@nestjs/common';
import { DatumService } from './datum.service';
import { DatumController } from './datum.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Datum } from './datum.entity';
import { LabModule } from 'src/lab/lab.module';

@Module({
  imports: [TypeOrmModule.forFeature([Datum]), LabModule],
  providers: [DatumService],
  controllers: [DatumController]
})
export class DatumModule {}
