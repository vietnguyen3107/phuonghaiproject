import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DataLabService } from './data-lab.service'
import { DataLabEntity } from './data-lab.entity'


@Controller('DataLab')
export class DataLabController {
  constructor(private readonly dataLabService: DataLabService) {

  }

  @Get()
  findAll(): Promise<DataLabEntity []> {
    return this.dataLabService.findAll()
  }

  //endpoint: http://localhost:3000/datalab/search
  @Get('/search')
  search(): Promise<DataLabEntity []> {
    return this.dataLabService.search()
  }

  @Get(':Id')
  get(@Param() params) {
    return this.dataLabService.findOne(params.Id);
  }

  @Post()
  create(@Body() datalab: DataLabEntity ) {
    return this.dataLabService.create(datalab);
  }

  @Put()
  update(@Body() datalab: DataLabEntity ) {
    return this.dataLabService.update(datalab);
  }

  @Delete(':Id')
  deleteUser(@Param() params) {
    return this.dataLabService.delete(params.Id);
  }
}
