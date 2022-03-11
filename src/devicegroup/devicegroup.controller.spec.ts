import { Test, TestingModule } from '@nestjs/testing';
import { DevicegroupController } from './devicegroup.controller';

describe('DevicegroupController', () => {
  let controller: DevicegroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicegroupController],
    }).compile();

    controller = module.get<DevicegroupController>(DevicegroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
