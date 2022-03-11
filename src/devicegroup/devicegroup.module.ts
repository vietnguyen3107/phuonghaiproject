import { Module } from '@nestjs/common';
import { DevicegroupService } from './devicegroup.service';
import { DevicegroupController } from './devicegroup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Devicegroup } from './devicegroup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Devicegroup])],
  providers: [DevicegroupService],
  controllers: [DevicegroupController]
})
export class DevicegroupModule {}
