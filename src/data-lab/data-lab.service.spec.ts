import { Test, TestingModule } from '@nestjs/testing';
import { DataLabService } from './data-lab.service';

describe('DataLabService', () => {
  let service: DataLabService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataLabService],
    }).compile();

    service = module.get<DataLabService>(DataLabService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
