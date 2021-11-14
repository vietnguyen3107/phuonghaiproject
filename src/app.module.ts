import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabModule } from './lab/lab.module';
import { SensorModule } from './sensor/sensor.module';
import { DeviceModule } from './device/device.module';
import { DatumModule } from './datum/datum.module';
import { getConnectionOptions, Repository } from 'typeorm';
import { UserModule } from './user/user.module';
import { BasicAuthMiddleware } from './user/basic.auth.middleware';
import { UserService } from './user/user.service';


@Module({
  imports: [
    //  TypeOrmModule.forRootAsync({
    //   useFactory: async () =>
    //     Object.assign(await 
    //      getConnectionOptions(), {
    //       autoLoadEntities: true,
    //     }),
    //   }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3309,
      username: 'phuonghai',
      password: 'phuonghai',
      database: 'phuonghaidb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],


      synchronize: true,
      insecureAuth : true,
    }),
    LabModule, SensorModule, DeviceModule, DatumModule, UserModule,

  ],
  controllers: [AppController],
  providers: [AppService ],
})




export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BasicAuthMiddleware)
    .exclude(
      'Users/Auth/(.*)',
    )
    .forRoutes('/');
  }
}