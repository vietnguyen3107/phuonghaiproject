import { Module } from '@nestjs/common';
import { DatumService } from './datum.service';
import { DatumController } from './datum.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Datum } from './datum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Datum])],
  providers: [DatumService],
  controllers: [DatumController]
})
export class DatumModule {}
