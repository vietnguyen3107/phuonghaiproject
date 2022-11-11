import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put } from '@nestjs/common';
import { UserDevicegroupService } from './user-devicegroup.service';
import { CreateUserDevicegroupDto } from './dto/create-user-devicegroup.dto';
import { RequestModel } from 'src/user/basic.auth.middleware';
import { UserDevicegroup } from './entities/user-devicegroup.entity';

@Controller('userDevicegroup')
export class UserDevicegroupController {
  constructor(private readonly userDevicegroupService: UserDevicegroupService) {}

  @Post()
  create(@Body() createUserDevicegroupDto: CreateUserDevicegroupDto,@Req() request: RequestModel ) {
    return this.userDevicegroupService.create(createUserDevicegroupDto, request.user);
  }

  @Put()
  update(@Body() obj: UserDevicegroup) {
    return this.userDevicegroupService.update(obj);
  }

  @Get()
  findAllByUser(@Req() request: RequestModel) {
    return this.userDevicegroupService.findAllByUser(request.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userDevicegroupService.findOne(+id);
  }


  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userDevicegroupService.delete(+id);
  // }
}
