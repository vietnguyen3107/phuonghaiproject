import { Test, TestingModule } from '@nestjs/testing';
import { UserDevicegroupController } from './user-devicegroup.controller';
import { UserDevicegroupService } from './user-devicegroup.service';

describe('UserDevicegroupController', () => {
  let controller: UserDevicegroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserDevicegroupController],
      providers: [UserDevicegroupService],
    }).compile();

    controller = module.get<UserDevicegroupController>(UserDevicegroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
