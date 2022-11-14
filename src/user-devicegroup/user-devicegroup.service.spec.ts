import { Test, TestingModule } from '@nestjs/testing';
import { UserDevicegroupService } from './user-devicegroup.service';

describe('UserDevicegroupService', () => {
  let service: UserDevicegroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDevicegroupService],
    }).compile();

    service = module.get<UserDevicegroupService>(UserDevicegroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
