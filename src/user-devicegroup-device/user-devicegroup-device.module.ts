import { Module } from '@nestjs/common';
import { UserDevicegroupDeviceService } from './user-devicegroup-device.service';
import { UserDevicegroupDeviceController } from './user-devicegroup-device.controller';
import { UserDevicegroupDevice } from './entities/user-devicegroup-device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserDevicegroupDevice])],
  controllers: [UserDevicegroupDeviceController],
  providers: [UserDevicegroupDeviceService]
})
export class UserDevicegroupDeviceModule {}
