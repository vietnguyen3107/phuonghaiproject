import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DevicesService } from './devices.service'
import { DevicesEntity } from './devices.entity'


@Controller('Devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {

  }

  @Get()
  findAll(): Promise<DevicesEntity[]> {
    return this.devicesService.findAll()
  }

  @Get(':Id')
  get(@Param() params) {
    return this.devicesService.findOne(params.Id);
  }

  @Post()
  create(@Body() devices: DevicesEntity) {
    return this.devicesService.create(devices);
  }

  @Put()
  update(@Body() devices: DevicesEntity) {
    return this.devicesService.update(devices);
  }

  @Delete(':Id')
  deleteUser(@Param() params) {
    return this.devicesService.delete(params.Id);
  }
}

