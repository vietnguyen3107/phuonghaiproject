import { Controller, Get, Post, Put, Delete, Body, Param, Req, HttpStatus, Request, HostParam, Query } from '@nestjs/common';
import { UserService } from './user.service'
import { User } from './user.entity'
import * as bcrypt from 'bcryptjs';
import { RequestModel } from './basic.auth.middleware';
import { eachMonthOfInterval } from 'date-fns';
import { MailService } from 'src/mail/mail.service';



@Controller('Users')
export class UserController {
  constructor(private readonly userService: UserService, private mailService : MailService ) {

  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':Id')
  get(@Param() params) {
    return this.userService.findOne(params.Id);
  }

  // @Post()
  // create(@Body() lab: User) {
  //   return this.userService.create(lab);
  // }

  @Put()
  async update(@Body() user: User) {
    //update user's password to hash
    const hash = await bcrypt.hash(user.Password, 10);
    user.Password = await hash

    return this.userService.update(user);
  }

  @Delete()
  deleteUser(@Req() req: RequestModel) {

    req.user.isDeleted = true;
    req.user.deletedDate = new Date();
    return this.userService.update(req.user);
  }


  //Auth controller
  @Post('/Auth/Register')
  async register(@Body() user: User) {
    let dbUser =  await this.userService.findByEmail(user)
    if (!dbUser) {
      const hash = await bcrypt.hash(user.Password, 10);
      user.Password = hash;
  
       return this.userService.create(user);
    }    
    else
      return {status: HttpStatus.BAD_REQUEST, message: "Email already exists"}
  }


  @Post('/Auth/ForgetPass')
  async forget_password(@Body() body) {
    const obj = new User();
    obj.Email = body.email
    let dbUser =  await this.userService.findByEmail(obj);
    if (!dbUser) {
      return {status: HttpStatus.BAD_REQUEST, message: "Email not exists"}
    }    
    else{
      const token = Math.random().toString(36).slice(-8);
      dbUser.resetToken = token;
      dbUser.resetDate = new Date();

      await this.userService.update(dbUser);

      //send mail
      await this.mailService.send(dbUser.Email, "Reset password Confirm", "/templates/index",{email: dbUser.Email, token: token})

      return {status: HttpStatus.OK, message: "Reset email has been sent!"}
    }
      
  }

  
  @Get('/Auth/ResetPass')
  async reset_password(@Query('email') email, @Query('token') token) {


    const obj = new User();
    obj.Email = email;
    let dbUser =  await this.userService.findByEmail(obj);

    if (!dbUser) {
      return {status: HttpStatus.BAD_REQUEST, message: "Email not exists"}
    } else if (!dbUser.resetDate || dbUser.resetDate > new Date()) {
      return {status: HttpStatus.BAD_REQUEST, message: "Token has been expired!"}
    } else if (!dbUser.resetToken || dbUser.resetToken !== token) {
      return {status: HttpStatus.BAD_REQUEST, message: "Token not valid!"}
    }
    else{
      const randomstring = Math.random().toString(36).slice(-8);
      const hash = await bcrypt.hash(randomstring, 10);
      dbUser.Password = hash;
      dbUser.resetDate = null;
      dbUser.resetToken = null;

      await this.userService.update(dbUser);

      return {status: HttpStatus.OK, message: "Password has been reset to '" +randomstring+ "', please use it to login and change to your new password!"}
    }
      
  }
  @Post('/Auth/Login')
  async login(@Body() user: User) {
    return await this.userService.login(user)
  }

}
