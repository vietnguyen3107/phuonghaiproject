import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor} from './sensor.entity';
import { UserService } from 'src/user/user.service';
@Module({
  imports: [TypeOrmModule.forFeature([Sensor])],
  providers: [SensorService],
  controllers: [SensorController]
})
export class SensorModule {}
