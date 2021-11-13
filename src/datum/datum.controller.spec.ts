import { Test, TestingModule } from '@nestjs/testing';
import { DatumController } from './datum.controller';

describe('DatumController', () => {
  let controller: DatumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatumController],
    }).compile();

    controller = module.get<DatumController>(DatumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
