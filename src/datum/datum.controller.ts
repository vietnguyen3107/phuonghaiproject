import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DatumService } from './datum.service'
import { Datum } from './datum.entity'


@Controller('datum')
export class DatumController {
  constructor(private readonly datumService: DatumService) {

  }

  @Get()
  findAll(): Promise<Datum[]> {
    return this.datumService.findAll()
  }

  @Get(':Id')
  get(@Param() params) {
    return this.datumService.findOne(params.Id);
  }

  @Post()
  create(@Body() datum: Datum) {
    return this.datumService.create(datum);
  }

  @Put()
  update(@Body() datum: Datum) {
    return this.datumService.update(datum);
  }

  @Delete(':Id')
  deleteUser(@Param() params) {
    return this.datumService.delete(params.Id);
  }
}

