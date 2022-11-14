import { Controller, Get, Post, Put, Delete, Body, Param, Req } from '@nestjs/common';
import { SensorService } from './sensor.service'
import { Sensor} from './sensor.entity'

import { ApiTags,ApiSecurity, ApiOperation, ApiParam} from '@nestjs/swagger';

@ApiTags('Sensors')
@ApiSecurity('access-key')
@Controller('Sensors')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {

  }
  

  @Get()
  findAll(): Promise<Sensor[]> {
    return this.sensorService.findAll()
  }

  @Get(':Id')
  @ApiOperation({ summary: 'Xem thông tin chi tiết Sensor theo Id' })
  @ApiParam({name: 'Id', required: true, description: 'ID của sensor'})
  get(@Param() params) {
    return this.sensorService.findOne(params.Id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo mới Sensor' })
  create(@Body() sensor: Sensor, @Req() req) {
    sensor.CreatedBy = req.user.Email;
    
    sensor.CreatedDate = new Date();
    return this.sensorService.create(sensor);
  }

  @Post('/Batch')
  @ApiOperation({ summary: 'Tạo mới danh sách các Sensor' })
  createBatch(@Body() sensors: Sensor[], @Req() req) {

    sensors.forEach(item => {
      item.CreatedBy = req.user.Email;
      item.CreatedDate = new Date();

      this.sensorService.create(item);
    });
    return sensors;
  }

  @Put()
  @ApiOperation({ summary: 'Cập nhật thông tin Sensor' })
  update(@Body() sensor: Sensor, @Req() req) {
    sensor.UpdatedBy = req.user.Email;
    sensor.UpdatedDate = new Date();
    return this.sensorService.update(sensor);
  }

  @Delete(':Id')
  @ApiOperation({ summary: 'Xóa Sensor khỏi hệ thống' })
  @ApiParam({name: 'Id', required: true, description: 'ID của sensor'})
  deleteUser(@Param() params) {
    return this.sensorService.delete(params.Id);
  }
}
