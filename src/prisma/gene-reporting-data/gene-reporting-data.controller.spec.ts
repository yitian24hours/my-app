import { Test, TestingModule } from '@nestjs/testing';
import { GeneReportingDataController } from './gene-reporting-data.controller';
import { GeneReportingDataService } from './gene-reporting-data.service';

describe('GeneReportingDataController', () => {
  let controller: GeneReportingDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneReportingDataController],
      providers: [GeneReportingDataService],
    }).compile();

    controller = module.get<GeneReportingDataController>(GeneReportingDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
