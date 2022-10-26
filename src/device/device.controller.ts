import { Controller, Get, Post, Put, Delete, Body, Param, Query, Request, Req } from '@nestjs/common';
import { DeviceService } from './device.service'
import { Device } from './device.entity'
import { RequestModel } from 'src/user/basic.auth.middleware';

import { ApiTags,ApiSecurity, ApiOperation, ApiParam} from '@nestjs/swagger';

@ApiTags('Devices')
@ApiSecurity('access-key')
@Controller('Devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {

  }

  @Get('/Search?')
  @ApiOperation({ summary: 'Tìm kiếm theo số Serial' })
  search(@Query('SerialNumber') SerialNumber: string): Promise<Device> {
    return this.deviceService.findOneBySerialNumber(SerialNumber)
  }

  @Get()
  @ApiOperation({ summary: 'LẤy tất cả thiết bị' })
  findAll(@Req() request: RequestModel): Promise<Device[]> {
    return this.deviceService.findAll()
  }


  @Get('/ByUser')
  @ApiOperation({ summary: 'Lấy các device mà User có quyền' })
  findDevicesByUser(@Req() request: RequestModel) {
    return this.deviceService.findDevicesByUser(request.user.Id)
  }


  @Get(':Id')
  @ApiParam({name: 'Id', required: true, description: 'ID của  Device'})
  @ApiOperation({ summary: 'Lấy thông tin chi tiết 1 device' })
  get(@Param() params) {
    return this.deviceService.findOne(params.Id);
  }

  @Post()  
  @ApiOperation({ summary: 'Tạo mới device' })
  create(@Body() obj: Device, @Req() request: RequestModel) {
    obj.CreatedBy = request.user.Email;
    obj.CreatedDate = new Date();
    return this.deviceService.create(obj);
  }

  @Put()
  @ApiOperation({ summary: 'Cập nhật thông tin device' })
  update(@Body() lab: Device) {
    return this.deviceService.update(lab);
  }

  @Delete(':Id')
  @ApiOperation({ summary: 'Xóa device theo ID' })
  deleteUser(@Param() params) {
    return this.deviceService.delete(params.Id);
  }
 

}
