import { Test, TestingModule } from '@nestjs/testing';
import { DataLabController } from './data-lab.controller';

describe('DataLabController', () => {
  let controller: DataLabController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataLabController],
    }).compile();

    controller = module.get<DataLabController>(DataLabController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
