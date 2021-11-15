import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { LabService } from './lab.service'
import { Lab } from './lab.entity'


@Controller('Labs')
export class LabController {
  constructor(private readonly labService: LabService) {

  }

  @Get('/Search?')
  search(@Query('SerialNumber') SerialNumber: string): Promise<Lab> {
    return this.labService.findOneBySerialNumber(SerialNumber)
  }

  @Get()
  findAll(): Promise<Lab[]> {
    return this.labService.findAll()
  }

  @Get(':Id')
  get(@Param() params) {
    return this.labService.findOne(params.Id);
  }

  @Post()
  create(@Body() lab: Lab) {
    return this.labService.create(lab);
  }

  @Put()
  update(@Body() lab: Lab) {
    return this.labService.update(lab);
  }

  @Delete(':Id')
  deleteUser(@Param() params) {
    return this.labService.delete(params.Id);
  }
}
