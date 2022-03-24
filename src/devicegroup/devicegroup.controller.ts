import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DevicegroupService } from './devicegroup.service';
import { Devicegroup } from './devicegroup.entity';
import { get } from 'http';
@Controller('Devicegroup')
export class DevicegroupController {
    constructor(private readonly devicegroupService: DevicegroupService){}
    @Get()
    findAll(): Promise <Devicegroup[]>{
        
        return this.devicegroupService.findAll()
    }
    @Get(':Id')
    get (@Param() params){
        return this.devicegroupService.findOne(params.Id)
    }
    @Post()
    create(@Body() devicegroup: Devicegroup){
        return this.devicegroupService.create(devicegroup)
    };
    @Put()
    update(@Body() devicegroup: Devicegroup){
        return this.devicegroupService.update(devicegroup)
    }
    @Delete(':Id')
    deleteUser (@Param() params){
        return this.devicegroupService.delete(params.Id)
    }
}
