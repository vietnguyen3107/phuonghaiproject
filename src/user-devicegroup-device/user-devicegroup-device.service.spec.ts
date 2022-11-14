import { Test, TestingModule } from '@nestjs/testing';
import { UserDevicegroupDeviceService } from './user-devicegroup-device.service';

describe('UserDevicegroupDeviceService', () => {
  let service: UserDevicegroupDeviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDevicegroupDeviceService],
    }).compile();

    service = module.get<UserDevicegroupDeviceService>(UserDevicegroupDeviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
