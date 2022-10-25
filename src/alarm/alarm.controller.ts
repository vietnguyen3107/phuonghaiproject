import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { UpdateAlarmDto } from './dto/update-alarm.dto';
import { Alarm } from './entities/alarm.entity';

@Controller('alarm')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @Post()
  create(@Body() item: Alarm, @Req() req) {
    item.CreatedBy = req.user.Email;
    item.CreatedDate = new Date();
    return this.alarmService.create(item);
  }

  @Get('')
  findByUser(@Query('pageSize') pageSize: number, @Query('page') page: number, @Req() req) {
    return this.alarmService.findByUser(req.user.Id, pageSize, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alarmService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlarmDto: Alarm) {
    return this.alarmService.update(+id, updateAlarmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alarmService.remove(+id);
  }
}
