import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put } from '@nestjs/common';
import { UserDevicegroupService } from './user-devicegroup.service';
import { CreateUserDevicegroupDto } from './dto/create-user-devicegroup.dto';
import { RequestModel } from 'src/user/basic.auth.middleware';
import { UserDevicegroup } from './entities/user-devicegroup.entity';
import { ApiOperation, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('UserDevicegroup')
@ApiSecurity('access-key')
@Controller('UserDevicegroup')
export class UserDevicegroupController {
  constructor(private readonly userDevicegroupService: UserDevicegroupService) {}

  @Post()  
  @ApiOperation({ summary: 'Tạo 1 nhóm thiết bị mới' })
  create(@Body() createUserDevicegroupDto: CreateUserDevicegroupDto,@Req() request: RequestModel ) {
    return this.userDevicegroupService.create(createUserDevicegroupDto, request.user);
  }

  @Put() 
  @ApiOperation({ summary: 'cập nhật thông tin nhóm' })
  update(@Body() obj: UserDevicegroup) {
    return this.userDevicegroupService.update(obj);
  }

  @Get() 
  @ApiOperation({ summary: 'Lấy tất cả các nhóm của User' })
  findAllByUser(@Req() request: RequestModel) {
    return this.userDevicegroupService.findAllByUser(request.user);
  }

  @Get(':id')
  @ApiParam({name: 'Id', required: true, description: 'ID của  Nhóm thiết bị'})
  @ApiOperation({ summary: 'Lấy thông tin chi tiết 1 nhóm thiết bị' })
  findOne(@Param('id') id: string) {
    return this.userDevicegroupService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userDevicegroupService.delete(+id);
  }
}
