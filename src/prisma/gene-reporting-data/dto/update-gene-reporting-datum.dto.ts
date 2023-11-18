import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneReportingDatumDto } from './create-gene-reporting-datum.dto';

export class UpdateGeneReportingDatumDto extends PartialType(CreateGeneReportingDatumDto) {}
