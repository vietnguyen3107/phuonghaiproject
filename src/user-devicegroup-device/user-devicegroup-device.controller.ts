import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put } from '@nestjs/common';
import { UserDevicegroupDeviceService } from './user-devicegroup-device.service';
import { CreateUserDevicegroupDeviceDto } from './dto/create-user-devicegroup-device.dto';
import { RequestModel } from 'src/user/basic.auth.middleware';
import { UserDevicegroupDevice } from './entities/user-devicegroup-device.entity';

@Controller('userDevicegroupDevice')
export class UserDevicegroupDeviceController {
  constructor(private readonly userDevicegroupDeviceService: UserDevicegroupDeviceService) {}

  @Post()
  create(@Body() createUserDevicegroupDto: CreateUserDevicegroupDeviceDto,@Req() request: RequestModel ) {
    return this.userDevicegroupDeviceService.create(createUserDevicegroupDto, request.user);
  }

  @Put()
  update(@Body() obj: UserDevicegroupDevice ) {
    return this.userDevicegroupDeviceService.update(obj);
  }

  @Delete(':Id')
  delete(@Param('Id') Id: string) {
    return this.userDevicegroupDeviceService.delete(+Id);
  }



}
