import { Module } from '@nestjs/common';
import { LabService } from './lab.service';
import { LabController } from './lab.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lab } from './lab.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Lab])],
  providers: [LabService],
  controllers: [LabController],
  exports: [LabService]
})

export class LabModule {}
