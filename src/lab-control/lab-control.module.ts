import { Module } from '@nestjs/common';
import { LabControlService } from './lab-control.service';
import { LabControlController } from './lab-control.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabControlEntity } from './lab-control.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LabControlEntity])],
  providers: [LabControlService],
  controllers: [LabControlController],
})
export class LabControlModule {}
