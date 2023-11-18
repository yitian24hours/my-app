import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGeneReportingDto } from './dto/create-gene-reporting.dto';
import { UpdateGeneReportingDto } from './dto/update-gene-reporting.dto';
import { PrismaClient } from '@prisma/client';
import { FindByNameGeneReportingDto } from './dto/findByName-gene-reporting.dto';
const prisma = new PrismaClient();

@Injectable()
export class GeneReportingService {
  async create(createGeneReportingDto: CreateGeneReportingDto) {
    try {
      return await prisma.geneReporting.create({ data: createGeneReportingDto })
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findByName(findByNameGeneReportingDto: FindByNameGeneReportingDto) {

    try {
      return await prisma.geneReporting.findUnique({
        where: { reportingName: findByNameGeneReportingDto.reportingName }
      })


    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }


  async findReportingByReportingName(reportingName:string){

    try {
      const resultFindReportingByReportingName = await prisma.geneReporting.findUnique({
        where:{reportingName:reportingName}
      })
      return resultFindReportingByReportingName;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    try {

      return await prisma.geneReporting.findMany()
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }

  findOne(id: number) {
    return `This action returns a #${id} geneReporting`;
  }

  update(id: number, updateGeneReportingDto: UpdateGeneReportingDto) {
    return `This action updates a #${id} geneReporting`;
  }

  remove(id: number) {
    return `This action removes a #${id} geneReporting`;
  }
}
