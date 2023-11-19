import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReadLine } from 'readline';

import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import LineByLine = require('n-readlines');
import { PathLike, readdir, readdirSync, unlink, unlinkSync } from 'fs';
import { join } from 'path';
import { GeneReportingService } from 'src/prisma/gene-reporting/gene-reporting.service';
import { CreateGeneReportingDto } from 'src/prisma/gene-reporting/dto/create-gene-reporting.dto';
import { CreateGeneReportingDatumDto } from 'src/prisma/gene-reporting-data/dto/create-gene-reporting-datum.dto';
import { PrismaClient } from '@prisma/client';
const geneReportingService = new GeneReportingService();
const prisma = new PrismaClient();
@Injectable()
export class UploadService {

  async uploadGeneReporting(file) {
    const fileName:string = file.filename.split(".")[0]
    try {
      const reporting = await prisma.geneReporting.findUnique({
        where:{
          reportingName:fileName
        }
      })

      if(reporting !== null){
        throw new HttpException("该检测报告已经上传,不要重复上传!",HttpStatus.BAD_REQUEST)
        
      }
    } catch (error) {
      throw new HttpException(error,HttpStatus.INTERNAL_SERVER_ERROR)
    }

    const path: any = join(__dirname, "../uploads")
    const dir:string[] = readdirSync(path)
    const lineByLine = new LineByLine(join(path, dir[0]))
    let line: String | Buffer | boolean;
    let lineArr: string[];
    let createArr:CreateGeneReportingDatumDto[] = new Array();

    lineByLine.next();

    let i = 0;
    while (line = lineByLine.next()) {
      i++
      lineArr = line.toString("ascii").split("\r")[0].split("\t");
      const cGRDataDto = new CreateGeneReportingDatumDto();
      cGRDataDto.chrType = lineArr[0];
      cGRDataDto.chrStart = parseInt(lineArr[1]);
      cGRDataDto.chrEnd = parseInt(lineArr[2]);
      cGRDataDto.chrValue = parseInt(lineArr[3]);
      createArr.push(cGRDataDto);

    };
    try {
      unlinkSync(join(path, dir[0]));
      return await prisma.geneReporting.create({
        data: {
          reportingName: fileName,
          geneReportingData: {
            create: createArr
          }
        }
      })
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }


  }





}
