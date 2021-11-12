import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { LabControlService } from './lab-control.service'
import { LabControlEntity } from './lab-control.entity'


@Controller('Labcontrol')
export class LabControlController {
  constructor(private readonly labControlService: LabControlService) {

  }

  @Get()
  findAll(): Promise<LabControlEntity[]> {
    return this.labControlService.findAll()
  }

  @Get(':Id')
  get(@Param() params) {
    return this.labControlService.findOne(params.Id);
  }

  @Post()
  create(@Body() labcontrol: LabControlEntity) {
    return this.labControlService.create(labcontrol);
  }

  @Put()
  update(@Body() labcontrol: LabControlEntity) {
    return this.labControlService.update(labcontrol);
  }

  @Delete(':Id')
  deleteUser(@Param() params) {
    return this.labControlService.delete(params.Id);
  }
}
