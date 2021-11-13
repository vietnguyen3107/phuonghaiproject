import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DeviceService } from './device.service'
import { Device } from './device.entity'


@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {

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
