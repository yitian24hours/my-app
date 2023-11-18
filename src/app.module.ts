import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GeneReportingModule } from './prisma/gene-reporting/gene-reporting.module';
import { GeneReportingDataModule } from './prisma/gene-reporting-data/gene-reporting-data.module';

import { UploadModule } from './upload/upload.module';


@Module({
  imports: [GeneReportingModule, GeneReportingDataModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
