import { Test, TestingModule } from '@nestjs/testing';
import { GeneReportingDataService } from './gene-reporting-data.service';

describe('GeneReportingDataService', () => {
  let service: GeneReportingDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneReportingDataService],
    }).compile();

    service = module.get<GeneReportingDataService>(GeneReportingDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
