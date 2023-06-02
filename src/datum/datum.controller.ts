import { Controller, StreamableFile, Get, Post, Put, Delete, Body, Param, Query, Res, Req } from '@nestjs/common';
import { DatumService } from './datum.service'
import { Datum } from './datum.entity'
import { createReadStream } from 'fs';
import { join } from 'path';
import { RequestModel } from 'src/user/basic.auth.middleware';

import { ApiTags,ApiSecurity, ApiOperation, ApiParam} from '@nestjs/swagger';

@ApiTags('Datums')
@ApiSecurity('access-key')
@Controller('Datums')
export class DatumController {
  constructor(private readonly datumService: DatumService) {

  }

  @Get('/LastHour?')
  @ApiOperation({ summary: 'Dữ liệu Datum của Sensor trong khoảng 1h gần nhất' })
  filter(@Query('SensorType') sensorType: string, @Query('DeviceSerialNumber') deviceSerialNumber: string ): Promise<Datum[]> {
    return this.datumService.getDatumLastHour(sensorType, deviceSerialNumber)
  }

  
  @Get('/Last24Hours?')
  @ApiOperation({ summary: 'Dữ liệu Datum của Sensor trong khoảng 24h gần nhất' })
  filter1(@Query('SensorType') sensorType: string, @Query('DeviceSerialNumber') deviceSerialNumber: string ): Promise<Datum[]> {
    return this.datumService.getDatumLast24Hours(sensorType, deviceSerialNumber)
  }



  @ApiOperation({ summary: 'Dữ liệu Datum của Sensor trong khoảng 7 ngày gần nhất' })
  @Get('/Last7Days?')
  filter2(@Query('SensorType') sensorType: string, @Query('DeviceSerialNumber') deviceSerialNumber: string ): Promise<Datum[]> {
    return this.datumService.getDatumLast7Days(sensorType, deviceSerialNumber)
  }


  @ApiOperation({ summary: 'Dữ liệu Datum của Sensor trong khoảng 30 ngày gần nhất' })
  @Get('/Last30Days?')
  filter3(@Query('SensorType') sensorType: string, @Query('DeviceSerialNumber') deviceSerialNumber: string ): Promise<Datum[]> {
    return this.datumService.getDatumLast30Days(sensorType, deviceSerialNumber)
  }


  @Get('/StatisticData?')
  @ApiOperation({ summary: 'Lấy dữ liệu phân tích Datum' })
  async filter4( @Query('StartDate') startDate: string, @Query('EndDate') endDate: string ): Promise<any> {
    const data = await this.datumService.getStatisticData( startDate, endDate)
    if (data === null) 
      return []
    else
      return data
  }

  @Get('/StatisticDataByDevice?')
  filter7( @Query('DeviceSerialNumber') deviceSerialNumber: string, @Query('StartDate') startDate: string, @Query('EndDate') endDate: string ): Promise<any> {
    return this.datumService.getStatisticDataByDevice( deviceSerialNumber,startDate, endDate)
  }

  @Get('/LastestDataByDevice?')
  @ApiOperation({ summary: 'Dữ liệu Datum mới nhất theo DeviceSerialNumber' })
  filter5( @Query('DeviceSerialNumber') deviceSerialNumber: string ): Promise<Datum[]> {
    return this.datumService.getLastestDataByDevice(deviceSerialNumber)
  }

  @Get('/LastestDataByAllDevices?')
  @ApiOperation({ summary: 'Dữ liệu Datummới nhất của tất cả các thiết bị' })
  filter5a(@Req() req: RequestModel): Promise<any> {


    return this.datumService.getLastestDataByAllDevices2(req.user.Id)
  }

  @Get('/StatisticDataBySensor?')
  async filter8( @Query('DeviceSerialNumber') deviceSerialNumber: string, @Query('StartDate') startDate: string, @Query('EndDate') endDate: string ): Promise<any> {
    const data = await this.datumService.getStatisticDataBySensor( deviceSerialNumber,startDate, endDate)
    if (data===null) {
      return []
    }
    else return data
  }

  @Get('/DownloadData1')
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'out.csv'));

    return new StreamableFile(file);

  }

  @Get('/DataByDate?')
  @ApiOperation({ summary: 'Dữ liệu Datum của Device trong khoảng StartDate - EndDate, dạng CSV' })
  async DataByDateCSV(@Query('DeviceSerialNumber') deviceSerialNumber: string, @Query('StartDate') startDate: string, @Query('EndDate') endDate: string ): Promise<StreamableFile> {

    const createCsvWriter = require('csv-writer').createObjectCsvWriter;

    const fileName = `DataFile_` + (new Date()).getTime() + '.csv'
    
    let rawData = await this.datumService.getDataByDate( deviceSerialNumber,startDate, endDate)
 
    try {
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


      csvWriter
    .writeRecords(rawData)
    .then(()=> console.log('The CSV file was written successfully'));

    const file = createReadStream(join(process.cwd(), fileName));

    return new StreamableFile(file);

    } catch (error) {
      console.log(error)
    }
 
    return null

  }

  @Get('/DataByDateJSon?')
  @ApiOperation({ summary: 'Dữ liệu Datum của Device trong khoảng StartDate - EndDate, dạng JSON' })
  async DataByDateJson(@Query('DeviceSerialNumber') deviceSerialNumber: string, @Query('StartDate') startDate: string, @Query('EndDate') endDate: string ): Promise<any> {

    let rawData = await this.datumService.getDataByDate( deviceSerialNumber,startDate, endDate)
 
    return rawData;

  }
  @Get(':Id')
  @ApiOperation({ summary: 'Thông tin chi tiết 1 Datum theo ID' })
  @ApiParam({name: 'Id', required: true, description: 'ID của Datum'})
  get(@Param() params) {
    return this.datumService.findOne(params.Id);
  }


  @Post()
  @ApiOperation({ summary: 'insert Datum' })
  create(@Body() datum: Datum, @Req() req) {
    datum.CreatedBy = req.user.Email;
    datum.CreatedDate = new Date();

    return this.datumService.create(datum);
  }

  @Post('/Batch')
  @ApiOperation({ summary: 'Insert danh sách các Datum ' })
  async createBatch(@Body() datums: Datum[], @Req() req) {


    for (const d of datums) {
        d.CreatedBy = req.user.Email;
        d.CreatedDate = new Date();

    }

    try {
      //update this to fix hanging problem
      const result = await this.datumService.creatBatchWithoutTransaction(datums);
      return result;
    } catch (error) {
      console.log(error)
    }
    return '';

  }


  @Post('/BatchWithoutTransaction')
  @ApiOperation({ summary: 'Insert danh sách các Datum ' })
  async createBatchWithouttransaction(@Body() datums: Datum[], @Req() req) {


    for (const d of datums) {
        d.CreatedBy = req.user.Email;
        d.CreatedDate = new Date();

    }

    try {
      const result = await this.datumService.creatBatchWithoutTransaction(datums);
      return result;
    } catch (error) {
      console.log(error)
    }
    return '';

  }
  @Put()
  @ApiOperation({ summary: 'Cập nhật Datum' })
  update(@Body() datum: Datum) {
    return this.datumService.update(datum);
  }

  @Delete(':Id')
  deleteUser(@Param() params) {
    return this.datumService.delete(params.Id);
  }


}
