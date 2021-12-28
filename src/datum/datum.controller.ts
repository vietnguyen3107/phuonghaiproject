import { Controller, StreamableFile, Get, Post, Put, Delete, Body, Param, Query, Res } from '@nestjs/common';
import { DatumService } from './datum.service'
import { Datum } from './datum.entity'
import { Lab } from 'src/lab/lab.entity';
import { Between } from 'typeorm';

import { createReadStream } from 'fs';
import { join } from 'path';

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

    //Local Endpoint: http://localhost:3000/Datums/LastHour?SensorType=CO2&DeviceSerialNumber=Serial1
  //Remote Endpoint: https://thegreenlab.xyz/Datums/LastHour?SensorType=CO2&DeviceSerialNumber=Serial1
  @Get('/Last24Hours?')
  filter1(@Query('SensorType') sensorType: string, @Query('DeviceSerialNumber') deviceSerialNumber: string ): Promise<Datum[]> {
    return this.datumService.getDatumLast24Hours(sensorType, deviceSerialNumber)
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


  @Get('/StatisticData?')
  filter4( @Query('StartDate') startDate: string, @Query('EndDate') endDate: string ): Promise<any> {
    return this.datumService.getStatisticData( startDate, endDate)
  }

  @Get('/StatisticDataByDevice?')
  filter7( @Query('DeviceSerialNumber') deviceSerialNumber: string, @Query('StartDate') startDate: string, @Query('EndDate') endDate: string ): Promise<any> {
    return this.datumService.getStatisticDataByDevice( deviceSerialNumber,startDate, endDate)
  }

  @Get('/LastestDataByDevice?')
  filter5( @Query('DeviceSerialNumber') deviceSerialNumber: string ): Promise<Datum[]> {
    return this.datumService.getLastestDataByDevice(deviceSerialNumber)
  }

  @Get('/StatisticDataBySensor?')
  async filter8( @Query('DeviceSerialNumber') deviceSerialNumber: string, @Query('StartDate') startDate: string, @Query('EndDate') endDate: string ): Promise<any> {
    const data = await this.datumService.getStatisticDataBySensor( deviceSerialNumber,startDate, endDate)
    if (data===null) {
      return `{"Error": "No Data"}`
    }
    else return data
  }

  @Get('/DownloadData1')
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'out.csv'));

    return new StreamableFile(file);

  }

  @Get('/DataByDate?')
  async filter9(@Query('DeviceSerialNumber') deviceSerialNumber: string, @Query('StartDate') startDate: string, @Query('EndDate') endDate: string ): Promise<StreamableFile> {

    const createCsvWriter = require('csv-writer').createObjectCsvWriter;

    const fileName = `DataFile_` + new Date() + '.csv'

    const csvWriter = createCsvWriter({
      path: fileName,
      header: [
        {id: "Date", title: "Date"},
        {id: "DeviceSerialNumber", title: "DeviceSerialNumber"},
        {id: "SensorType",  title: "SensorType"},
        {id: "Value", title: "Value"},
        {id: "Unit",  title: "Unit"},
        {id: "Status", title: "Status"}
       
      ]
    });
    
    let rawData = await this.datumService.getDataByDate( deviceSerialNumber,startDate, endDate)
 

    try{
    csvWriter
    .writeRecords(rawData)
    .then(()=> console.log('The CSV file was written successfully'));

    const file = createReadStream(join(process.cwd(), fileName));

    return new StreamableFile(file);
    }
    catch(e){
      console.log(e)
    }

    return null

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

  @Post('/Batch')
  createBatch(@Body() datums: Datum[]) {

    console.log(datums)
    datums.forEach(d => {
      this.datumService.create(d);
    });
    return datums;
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
