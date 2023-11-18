import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGeneReportingDatumDto } from './dto/create-gene-reporting-datum.dto';
import { UpdateGeneReportingDatumDto } from './dto/update-gene-reporting-datum.dto';
import { Prisma, PrismaClient } from '@prisma/client';
import { FindGeneReportingDataByChrTypeDto } from './dto/findGeneReportingDataByChrType.dto';
import { FindGeneReportingDataByChrRangeDto } from './dto/findGeneReportingDataByChrRange.dto';
import { FindGeneReportingDataMaxMinChrNumberDto } from './dto/findGeneReportingDataMaxMinChrNumber.dto';
import { GeneReportingService } from '../gene-reporting/gene-reporting.service'; 
const prisma = new PrismaClient();
const geneReportingService = new GeneReportingService()
@Injectable()
export class GeneReportingDataService {
  async create(createGeneReportingDatumDto: CreateGeneReportingDatumDto) {
    try {
      return await prisma.geneReportingData.create({data:createGeneReportingDatumDto})
    } catch (error) {
      throw new HttpException(error,HttpStatus.INTERNAL_SERVER_ERROR)      
    }
  }
  async findGeneReportingDataByChrType(findGeneReportingDataByChrTypeDto:FindGeneReportingDataByChrTypeDto){
    try {
      return await prisma.geneReportingData.findMany({
        where:{
          chrType:findGeneReportingDataByChrTypeDto.chrType,
          geneReportingId:findGeneReportingDataByChrTypeDto.geneReportingId
        }
      })
    } catch (error) {
      throw new HttpException(error,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  async chartDataInitByGeneReportingName(reportingName:string){

    try {
      const reportingId:number = (await geneReportingService.findReportingByReportingName(reportingName)).id;


      const resultFindChrTypeByReportingId = await this.findChrTypeByReportingId(reportingId);
      let  findGeneReportingDataByChrTypeDto = new FindGeneReportingDataByChrTypeDto();
      findGeneReportingDataByChrTypeDto.chrType = resultFindChrTypeByReportingId[0].chrType;
      findGeneReportingDataByChrTypeDto.geneReportingId = reportingId;

      const resultFindGeneReportingDataByChrType = await this.findGeneReportingDataByChrType(findGeneReportingDataByChrTypeDto);
      const resultFindMaxMinValue = await prisma.geneReportingData.groupBy({
        by:["chrType"],
        where:{chrType:resultFindChrTypeByReportingId[0].chrType,geneReportingId:reportingId},
        _max:{
          chrEnd:true
        },
        _min:{
          chrStart:true
        }
      })
      return {
        reportingId:reportingId,
        resultFindChrTypeByReportingId:resultFindChrTypeByReportingId,
        resultFindGeneReportingDataByChrType:resultFindGeneReportingDataByChrType,
        resultFindMaxMinValue:resultFindMaxMinValue
      }
    } catch (error) {
      throw new HttpException(error,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findGeneReportingDataMaxMinChrNumber(findGeneReportingDataMaxMinChrNumberDto:FindGeneReportingDataMaxMinChrNumberDto){
    try {
      const resultFindGeneReportingDataMaxMinChrNumber = await prisma.geneReportingData.groupBy({
        by:["chrType"],
        where:{chrType:findGeneReportingDataMaxMinChrNumberDto.chrType,geneReportingId:findGeneReportingDataMaxMinChrNumberDto.geneReportingId},
        _max:{
          chrEnd:true
        },
        _min:{
          chrStart:true
        }
      })
      return resultFindGeneReportingDataMaxMinChrNumber;
    } catch (error) {
      throw new HttpException(error,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findGeneReportingDataByChrRange(findGeneReportingDataByChrRangeDto:FindGeneReportingDataByChrRangeDto){

    try {
      let datax:number[] = new Array();
      let datay:number[] = new Array();
      const resultFindGeneReportingDataByChrRange = await prisma.geneReportingData.findMany({
        where:{
          chrStart:{
            gte:findGeneReportingDataByChrRangeDto.minChrNumber
          },
          chrEnd:{
            lte:findGeneReportingDataByChrRangeDto.maxChrNumber
          },
          chrType:findGeneReportingDataByChrRangeDto.chrType,
          geneReportingId:findGeneReportingDataByChrRangeDto.geneReportingId
        }
      })
      resultFindGeneReportingDataByChrRange.forEach(o=>{

        datax.push(o.chrEnd)
        datay.push(o.chrValue)
      })
      return {
        datax:datax,
        datay:datay
      };
    } catch (error) {
      throw new HttpException(error,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async charDataInit(){
    try {
      const resultFindFirstReporting = await prisma.geneReporting.findMany();
      const resultFindChrTypeByReportingId = await this.findChrTypeByReportingId(resultFindFirstReporting[0].id);
      let  findGeneReportingDataByChrTypeDto = new FindGeneReportingDataByChrTypeDto();
      findGeneReportingDataByChrTypeDto.chrType = resultFindChrTypeByReportingId[0].chrType;
      findGeneReportingDataByChrTypeDto.geneReportingId = resultFindFirstReporting[0].id;

      const resultFindGeneReportingDataByChrType = await this.findGeneReportingDataByChrType(findGeneReportingDataByChrTypeDto);
      const resultFindMaxMinValue = await prisma.geneReportingData.groupBy({
        by:["chrType"],
        where:{chrType:resultFindChrTypeByReportingId[0].chrType,geneReportingId:resultFindFirstReporting[0].id},
        _max:{
          chrEnd:true
        },
        _min:{
          chrStart:true
        }
      })
      return {
        resultFindFirstReporting:resultFindFirstReporting,
        resultFindChrTypeByReportingId:resultFindChrTypeByReportingId,
        resultFindGeneReportingDataByChrType:resultFindGeneReportingDataByChrType,
        resultFindMaxMinValue:resultFindMaxMinValue
      }

    } catch (error) {
      throw new HttpException(error,HttpStatus.INTERNAL_SERVER_ERROR)
    }


  }


  async findChrTypeByReportingId(id:number){


    try {

      const result = await prisma.$queryRaw(Prisma.sql(['SELECT t.chrType FROM `genereportingdata` t GROUP BY t.chrType ORDER BY t.id']))

      // const result  = await prisma.geneReportingData.groupBy({

      //   by:['chrType'],
      //   where:{"geneReportingId":idNumber},
      //   orderBy:{chrType:"asc"}
      // })

      return result;
      
    } catch (error) {
      throw new HttpException(error,HttpStatus.INTERNAL_SERVER_ERROR)
      
    }
  }

  findAll() {
    return `This action returns all geneReportingData`;
  }

  findOne(id: number) {
    return `This action returns 1a #${id} geneReportingDatum`;
  }

  update(id: number, updateGeneReportingDatumDto: UpdateGeneReportingDatumDto) {
    return `This action updates 2a #${id} geneReportingDatum`;
  }

  remove(id: number) {
    return `This action removes 3a #${id} geneReportingDatum`;
  }
}
