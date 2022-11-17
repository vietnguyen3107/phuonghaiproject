import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor} from './sensor.entity';
import { UserService } from 'src/user/user.service';
import { Device } from 'src/device/device.entity';
import { DeviceService } from 'src/device/device.service';
@Module({
  imports: [TypeOrmModule.forFeature([Sensor, Device])],
  providers: [SensorService, DeviceService],
  controllers: [SensorController]
})
export class SensorModule {}
