import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put } from '@nestjs/common';
import { UserDevicegroupDeviceService } from './user-devicegroup-device.service';
import { CreateUserDevicegroupDeviceDto } from './dto/create-user-devicegroup-device.dto';
import { RequestModel } from 'src/user/basic.auth.middleware';
import { UserDevicegroupDevice } from './entities/user-devicegroup-device.entity';
import { ApiOperation, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('UserDevicegroupDevice')
@ApiSecurity('access-key')
@Controller('UserDevicegroupDevice')
export class UserDevicegroupDeviceController {
  constructor(private readonly userDevicegroupDeviceService: UserDevicegroupDeviceService) {}

  @Post()
  @ApiOperation({ summary: 'Thêm 1 thiết bị vào nhóm' })
  create(@Body() createUserDevicegroupDto: CreateUserDevicegroupDeviceDto,@Req() request: RequestModel ) {
    return this.userDevicegroupDeviceService.create(createUserDevicegroupDto, request.user);
  }

  @Put()
  @ApiOperation({ summary: 'Cập nhật thứ tự Orderno của thiết bị trong nhóm' })
  update(@Body() obj: UserDevicegroupDevice ) {
    return this.userDevicegroupDeviceService.update(obj);
  }

  @Delete(':Id')
  @ApiParam({name: 'Id', required: true, description: 'ID của UserDevicegroupDevice'})
  @ApiOperation({ summary: 'Xóa 1 thiết bị ra khỏi nhóm' })
  delete(@Param('Id') Id: string) {
    return this.userDevicegroupDeviceService.delete(+Id);
  }



}
