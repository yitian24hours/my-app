import { Module } from '@nestjs/common';
import { GeneReportingDataService } from './gene-reporting-data.service';
import { GeneReportingDataController } from './gene-reporting-data.controller';

@Module({
  controllers: [GeneReportingDataController],
  providers: [GeneReportingDataService],
})
export class GeneReportingDataModule {}
