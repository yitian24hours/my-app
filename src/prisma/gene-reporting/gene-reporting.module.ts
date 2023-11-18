import { Module } from '@nestjs/common';
import { GeneReportingService } from './gene-reporting.service';
import { GeneReportingController } from './gene-reporting.controller';

@Module({
  controllers: [GeneReportingController],
  providers: [GeneReportingService],
})
export class GeneReportingModule {}
