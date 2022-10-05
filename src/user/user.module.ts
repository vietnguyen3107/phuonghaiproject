import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MailService } from 'src/mail/mail.service';
import { DeviceService } from 'src/device/device.service';
import { Device } from 'src/device/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Device]),  UserModule],
  providers: [UserService, MailService, DeviceService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
