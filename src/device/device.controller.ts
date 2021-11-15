import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { DeviceService } from './device.service'
import { Device } from './device.entity'


@Controller('Devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {

  }

  @Get('/Search?')
  search(@Query('SerialNumber') SerialNumber: string): Promise<Device> {
    return this.deviceService.findOneBySerialNumber(SerialNumber)
  }

  @Get()
  findAll(): Promise<Device[]> {
    return this.deviceService.findAll()
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
