import { Controller, Get, Post, Put, Delete, Body, Param, Req } from '@nestjs/common';
import { SensorService } from './sensor.service'
import { Sensor} from './sensor.entity'
import { UserService } from 'src/user/user.service';


@Controller('Sensors')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {

  }
  

  @Get()
  findAll(): Promise<Sensor[]> {
    return this.sensorService.findAll()
  }

  @Get(':Id')
  get(@Param() params) {
    return this.sensorService.findOne(params.Id);
  }

  @Post()
  create(@Body() sensor: Sensor, @Req() req) {
    sensor.CreatedBy = req.user.Email;
    
    sensor.CreatedDate = new Date();
    return this.sensorService.create(sensor);
  }

  @Post('/Batch')
  createBatch(@Body() sensors: Sensor[], @Req() req) {

    sensors.forEach(item => {
      item.CreatedBy = req.user.Email;
      item.CreatedDate = new Date();

      this.sensorService.create(item);
    });
    return sensors;
  }

  @Put()
  update(@Body() sensor: Sensor, @Req() req) {
    sensor.UpdatedBy = req.user.Email;
    sensor.UpdatedDate = new Date();
    return this.sensorService.update(sensor);
  }

  @Delete(':Id')
  deleteUser(@Param() params) {
    return this.sensorService.delete(params.Id);
  }
}
