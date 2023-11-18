import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GeneReportingDataService } from './gene-reporting-data.service';
import { CreateGeneReportingDatumDto } from './dto/create-gene-reporting-datum.dto';
import { UpdateGeneReportingDatumDto } from './dto/update-gene-reporting-datum.dto';
import { FindGeneReportingDataByChrTypeDto } from './dto/findGeneReportingDataByChrType.dto';
import { FindGeneReportingDataByChrRangeDto } from './dto/findGeneReportingDataByChrRange.dto';
import { query } from 'express';
import { FindGeneReportingDataMaxMinChrNumberDto } from './dto/findGeneReportingDataMaxMinChrNumber.dto';

@Controller('gene-reporting-data')
export class GeneReportingDataController {
  constructor(private readonly geneReportingDataService: GeneReportingDataService) {}

  @Post()
  create(@Body() createGeneReportingDatumDto: CreateGeneReportingDatumDto) {
    return this.geneReportingDataService.create(createGeneReportingDatumDto);
  }



  @Get('findGeneReportingDataByChrType')
  findGeneReportingDataByChrType(@Body() findGeneReportingDataByChrTypeDto:FindGeneReportingDataByChrTypeDto){


    return this.geneReportingDataService.findGeneReportingDataByChrType(findGeneReportingDataByChrTypeDto)
  }


  @Get('findChrTypeByReportingId')
  findChrTypeByReportingId(@Body("id") id: number){

    return this.geneReportingDataService.findChrTypeByReportingId(id);
  }

  @Get('findGeneReportingDataByChrRange')
  findGeneReportingDataByChrRange(@Query("chrType") chrType:string, @Query("geneReportingId") geneReportingId:string,@Query("minChrNumber") minChrNumber:string,@Query("maxChrNumber") maxChrNumber:string){

    let findGeneReportingDataByChrRangeDto = new FindGeneReportingDataByChrRangeDto();
    findGeneReportingDataByChrRangeDto.chrType = chrType;
    findGeneReportingDataByChrRangeDto.geneReportingId = parseInt(geneReportingId);
    findGeneReportingDataByChrRangeDto.minChrNumber = parseInt(minChrNumber);
    findGeneReportingDataByChrRangeDto.maxChrNumber = parseInt(maxChrNumber);

    return this.geneReportingDataService.findGeneReportingDataByChrRange(findGeneReportingDataByChrRangeDto)
  }

  @Get('chartDataInit')
  charDataInit(){

    return this.geneReportingDataService.charDataInit()
  }

  @Get('chartDataInitByGeneReportingName')
  chartDataInitByGeneReportingName(@Query("reportingName") reportingName:string){

    return this.geneReportingDataService.chartDataInitByGeneReportingName(reportingName)

  }


  @Get('findGeneReportingDataMaxMinChrNumber')
  findGeneReportingDataMaxMinChrNumber(@Query('chrType') chrType:string,@Query("geneReportingId") geneReportingId:string){
    let findGeneReportingDataMaxMinChrNumberDto = new FindGeneReportingDataMaxMinChrNumberDto();
    findGeneReportingDataMaxMinChrNumberDto.chrType = chrType;
    findGeneReportingDataMaxMinChrNumberDto.geneReportingId = parseInt(geneReportingId);

    return this.geneReportingDataService.findGeneReportingDataMaxMinChrNumber(findGeneReportingDataMaxMinChrNumberDto)

  }


  @Get()
  findAll() {
    return this.geneReportingDataService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.geneReportingDataService.findOne(+id);
  }




  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeneReportingDatumDto: UpdateGeneReportingDatumDto) {
    return this.geneReportingDataService.update(+id, updateGeneReportingDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.geneReportingDataService.remove(+id);
  }
}
