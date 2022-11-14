import { Test, TestingModule } from '@nestjs/testing';
import { UserDevicegroupDeviceController } from './user-devicegroup-device.controller';
import { UserDevicegroupDeviceService } from './user-devicegroup-device.service';

describe('UserDevicegroupDeviceController', () => {
  let controller: UserDevicegroupDeviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserDevicegroupDeviceController],
      providers: [UserDevicegroupDeviceService],
    }).compile();

    controller = module.get<UserDevicegroupDeviceController>(UserDevicegroupDeviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
