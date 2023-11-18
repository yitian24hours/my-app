import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneReportingDto } from './create-gene-reporting.dto';

export class UpdateGeneReportingDto extends PartialType(CreateGeneReportingDto) {}
