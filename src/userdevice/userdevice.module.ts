import { Module } from '@nestjs/common';
import { UserDeviceService } from './userdevice.service';
import { UserdeviceController } from './userdevice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDevice } from './userdevice.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports : [TypeOrmModule.forFeature([UserDevice]), UserModule],
  controllers: [UserdeviceController],
  providers: [UserDeviceService]
})
export class UserdeviceModule {}
