import { Controller, Get, Post, Put, Delete, Body, Param, Query, Request, Req } from '@nestjs/common';
import { DeviceService } from './device.service'
import { Device } from './device.entity'
import { Sensor } from 'src/sensor/sensor.entity';
import { RequestModel } from 'src/user/basic.auth.middleware';


@Controller('Devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {

  }

  @Get('/Search?')
  search(@Query('SerialNumber') SerialNumber: string): Promise<Device> {
    return this.deviceService.findOneBySerialNumber(SerialNumber)
  }

  @Get()
  findAll(@Req() request: RequestModel): Promise<Device[]> {
    return this.deviceService.findAll()
  }


  @Get('/ByUser')
  findDevicesByUser(@Req() request: RequestModel): Promise<Device[]> {
    return this.deviceService.findDevicesByUser(request.user.Id)
  }


  @Get(':Id')
  get(@Param() params) {
    return this.deviceService.findOne(params.Id);
  }

  @Post()
  create(@Body() lab: Device) {
    return this.deviceService.create(lab);
  }

  @Put()
  update(@Body() lab: Device) {
    return this.deviceService.update(lab);
  }

  @Delete(':Id')
  deleteUser(@Param() params) {
    return this.deviceService.delete(params.Id);
  }
 

}
