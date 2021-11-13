import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { DatumService } from './datum.service'
import { Datum } from './datum.entity'


@Controller('Datums')
export class DatumController {
  constructor(private readonly datumService: DatumService) {

  }
  //Local Endpoint: http://localhost:3000/Datums/LastHour?SensorType=CO2&DeviceSerialNumber=Serial1
  //Remote Endpoint: https://thegreenlab.xyz/Datums/LastHour?SensorType=CO2&DeviceSerialNumber=Serial1
  @Get('/LastHour?')
  filter(@Query('SensorType') sensorType: string, @Query('DeviceSerialNumber') deviceSerialNumber: string ): Promise<Datum[]> {
    return this.datumService.getDatumLastHour(sensorType, deviceSerialNumber)
  }

  //Local Endpoint: http://localhost:3000/Datums/Last7Days?SensorType=CO2&DeviceSerialNumber=Serial1
  //Remote Endpoint: https://thegreenlab.xyz/Datums/Last7Days?SensorType=CO2&DeviceSerialNumber=Serial1
  
  @Get('/Last7Days?')
  filter2(@Query('SensorType') sensorType: string, @Query('DeviceSerialNumber') deviceSerialNumber: string ): Promise<Datum[]> {
    return this.datumService.getDatumLast7Days(sensorType, deviceSerialNumber)
  }

  //Local Endpoint: http://localhost:3000/Datums/Last30Days?SensorType=CO2&DeviceSerialNumber=Serial1
  //Remote Endpoint: https://thegreenlab.xyz/Datums/Last30Days?SensorType=CO2&DeviceSerialNumber=Serial1
  @Get('/Last30Days?')
  filter3(@Query('SensorType') sensorType: string, @Query('DeviceSerialNumber') deviceSerialNumber: string ): Promise<Datum[]> {
    return this.datumService.getDatumLast30Days(sensorType, deviceSerialNumber)
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
