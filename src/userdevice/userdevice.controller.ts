
import { Controller, Get, Post, Patch, Delete, Body, Param, Query, Req } from '@nestjs/common';
import { UserDeviceService } from './userdevice.service';
import { UserDevice } from './userdevice.entity';
import { getManager } from 'typeorm';




@Controller('UserDevices')
export class UserdeviceController {
  constructor(private readonly userdeviceService: UserDeviceService) {}

  @Post()
  create(@Body() userDevice: UserDevice) {
    return this.userdeviceService.create(userDevice);
  }

  @Post('/Assign')
  async create2(@Body() userDevices: UserDevice[]) {
    try{

      let userDevice0 = userDevices[0]
      //console.log(userDevices)
      const entityManager = getManager();
      let sql = `delete from userdevice where User_Id=${userDevice0.User.Id}`
      //console.log(sql)
      let rawData = await entityManager.query(sql)
      //console.log(JSON.parse(JSON.stringify(rawData)))

      for (const ud of userDevices) {
        this.userdeviceService.create(ud);
      }
    
      return {"Status": "OK"}

    }
    catch(e){
      return {"Error": e.message}
    }

  }
 

  @Get()
  findAll() {
    return this.userdeviceService.findAll();
  }

  @Get(':id')
  findOne(@Param() params) {
    return this.userdeviceService.findOne(params.Id);
  }

  @Get('/UserDeviceByDevice')
  async filter( @Query('DeviceSerialNumber') deviceSerialNumber: string ): Promise<any> {
    return this.userdeviceService.getAllUserDevicesByDevice(deviceSerialNumber)
  }


  @Delete(':id')
  remove(@Param() params) {
    return this.userdeviceService.remove(params.id);
  }
}

