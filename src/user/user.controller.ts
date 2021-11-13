import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service'
import { User } from './user.entity'


@Controller('Users')
export class UserController {
  constructor(private readonly userService: UserService) {

  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':Id')
  get(@Param() params) {
    return this.userService.findOne(params.Id);
  }

  @Post()
  create(@Body() lab: User) {
    return this.userService.create(lab);
  }

  @Put()
  update(@Body() lab: User) {
    return this.userService.update(lab);
  }

  @Delete(':Id')
  deleteUser(@Param() params) {
    return this.userService.delete(params.Id);
  }
}
