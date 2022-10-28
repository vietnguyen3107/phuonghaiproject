import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Put } from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { Alarm } from './entities/alarm.entity';

import { ApiTags,ApiSecurity, ApiOperation, ApiParam} from '@nestjs/swagger';

@ApiTags('alarm')
@ApiSecurity('access-key')
@Controller('alarm')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @Post()
  @ApiOperation({ summary: 'Insert thông tin Alarm' })
  create(@Body() item: Alarm, @Req() req) {
    item.CreatedBy = req.user.Email;
    item.CreatedDate = new Date();
    return this.alarmService.create(item);
  }

  @Get('')
  @ApiOperation({ summary: 'Lấy các alarm trên các thiết bị của người dùng hiện tại' })
  findByUser(@Query('pageSize') pageSize: number = 20, @Query('page') page: number = 1, @Req() req) {
    return this.alarmService.findByUser(req.user.Id, pageSize, page);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Xem thông tin chi tiết Alarm theo Id' })
  @ApiParam({name: 'id', required: true, description: 'ID của Alarm'})
  findOne(@Param('id') id: string) {
    return this.alarmService.findOne(+id);
  }

  @Put()
  @ApiOperation({ summary: 'Cập nhật nội dung Alarm theo Id ' })
  update( @Body() updateAlarmDto: Alarm) {
    return this.alarmService.update(updateAlarmDto.Id, updateAlarmDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa Alarm theo Id' })
  @ApiParam({name: 'id', required: true, description: 'ID của Alarm'})
  remove(@Param('id') id: string) {
    return this.alarmService.remove(+id);
  }
}
