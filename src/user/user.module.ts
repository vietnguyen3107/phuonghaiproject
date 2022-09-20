import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]),  UserModule],
  providers: [UserService, MailService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
