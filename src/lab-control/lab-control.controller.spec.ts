import { Test, TestingModule } from '@nestjs/testing';
import { LabControlController } from './lab-control.controller';

describe('LabControlController', () => {
  let controller: LabControlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabControlController],
    }).compile();

    controller = module.get<LabControlController>(LabControlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
