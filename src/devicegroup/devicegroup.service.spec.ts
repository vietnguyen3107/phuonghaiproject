import { Test, TestingModule } from '@nestjs/testing';
import { DevicegroupService } from './devicegroup.service';

describe('DevicegroupService', () => {
  let service: DevicegroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevicegroupService],
    }).compile();

    service = module.get<DevicegroupService>(DevicegroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
