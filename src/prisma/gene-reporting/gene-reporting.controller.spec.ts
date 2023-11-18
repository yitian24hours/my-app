import { Test, TestingModule } from '@nestjs/testing';
import { GeneReportingController } from './gene-reporting.controller';
import { GeneReportingService } from './gene-reporting.service';

describe('GeneReportingController', () => {
  let controller: GeneReportingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneReportingController],
      providers: [GeneReportingService],
    }).compile();

    controller = module.get<GeneReportingController>(GeneReportingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
