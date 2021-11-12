import { Test, TestingModule } from '@nestjs/testing';
import { LabControlService } from './lab-control.service';

describe('LabControlService', () => {
  let service: LabControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LabControlService],
    }).compile();

    service = module.get<LabControlService>(LabControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
