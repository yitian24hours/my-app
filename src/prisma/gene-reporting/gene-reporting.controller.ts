import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GeneReportingService } from './gene-reporting.service';
import { CreateGeneReportingDto } from './dto/create-gene-reporting.dto';
import { UpdateGeneReportingDto } from './dto/update-gene-reporting.dto';
import { FindByNameGeneReportingDto } from './dto/findByName-gene-reporting.dto';
//import { GeneReportingPipe } from './gene-reporting.pipe';
@Controller('gene-reporting')
export class GeneReportingController {
  constructor(private readonly geneReportingService: GeneReportingService) {}

  @Post()
  create(@Body() createGeneReportingDto: CreateGeneReportingDto) {
    return this.geneReportingService.create(createGeneReportingDto);
  }

  @Get('findByName')
  findByName(@Body() findByNameGeneReportingDto:FindByNameGeneReportingDto){
    return this.geneReportingService.findByName(findByNameGeneReportingDto)
  }

  @Get()
  findAll() {
    return this.geneReportingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.geneReportingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeneReportingDto: UpdateGeneReportingDto) {
    return this.geneReportingService.update(+id, updateGeneReportingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.geneReportingService.remove(+id);
  }
}
