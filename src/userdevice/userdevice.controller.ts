import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { UserDeviceService } from './userdevice.service';
import { UserDevice } from './userdevice.entity';



@Controller('Userdevices')
export class UserdeviceController {
  constructor(private readonly userdeviceService: UserDeviceService) {}

  @Post()
  create(@Body() userDevice: UserDevice) {
    return this.userdeviceService.create(userDevice);
  }
 

  @Get()
  findAll() {
    return this.userdeviceService.findAll();
  }

  @Get(':id')
  findOne(@Param() params) {
    return this.userdeviceService.findOne(params.Id);
  }

  @Get('/UserByDevice?')
  async filter( @Query('DeviceSerialNumber') deviceSerialNumber: string ): Promise<any> {
    return this.userdeviceService.getAllUserByDevice(deviceSerialNumber)
  }


  @Delete(':id')
  remove(@Param() params) {
    return this.userdeviceService.remove(params.id);
  }
}
