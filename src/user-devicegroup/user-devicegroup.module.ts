import { Module } from '@nestjs/common';
import { UserDevicegroupService } from './user-devicegroup.service';
import { UserDevicegroupController } from './user-devicegroup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDevicegroup } from './entities/user-devicegroup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserDevicegroup])],
  controllers: [UserDevicegroupController],
  providers: [UserDevicegroupService]
})
export class UserDevicegroupModule {}
