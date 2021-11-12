import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LabControlModule } from './lab-control/lab-control.module';
import { LabControlController } from './lab-control/lab-control.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesModule } from './devices/devices.module';
import { SensorsModule } from './sensors/sensors.module';
import { DataLabModule } from './data-lab/data-lab.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3309,
      username: 'phuonghai',
      password: 'phuonghai',
      database: 'phuonghai',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }), 
    LabControlModule, DevicesModule, SensorsModule,  DataLabModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
