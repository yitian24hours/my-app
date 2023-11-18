import { Test, TestingModule } from '@nestjs/testing';
import { GeneReportingService } from './gene-reporting.service';

describe('GeneReportingService', () => {
  let service: GeneReportingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneReportingService],
    }).compile();

    service = module.get<GeneReportingService>(GeneReportingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
