import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabModule } from './lab/lab.module';
import { SensorModule } from './sensor/sensor.module';
import { DeviceModule } from './device/device.module';
import { DatumModule } from './datum/datum.module';
import { UserModule } from './user/user.module';
import { BasicAuthMiddleware } from './user/basic.auth.middleware';

import { UserdeviceModule } from './userdevice/userdevice.module';
import { DevicegroupModule } from './devicegroup/devicegroup.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AlarmModule } from './alarm/alarm.module';



@Module({
  imports: [

    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "phuonghaigreenlab@gmail.com", // generated ethereal user
          pass: "4ngoiSao" // generated ethereal password
        },
      },
      defaults: {
        from: '"nest-modules" <user@outlook.com>', // outgoing email ID
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
    }),
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      //host: '52.74.203.70',

      //new db
       host: '52.74.63.36',
     // host: 'localhost',
      port: 3306,
      username: 'phuonghai',
      password: 'phuonghai',
      database: 'phuonghai',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      logging: true,
      autoLoadEntities: true,
      synchronize: false,
    }),
    LabModule, SensorModule, DeviceModule, DatumModule, UserModule, UserdeviceModule, DevicegroupModule, AlarmModule,

  ],
  controllers: [AppController],
  providers: [AppService ],
})




export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BasicAuthMiddleware)
    .exclude(
      'Users/Auth/(.*)',
      '/api',
      '/flutter_service_worker.js',
      'frontend/(.*)'
    )
    .forRoutes('/');
  }
}

// export class AppModule { }