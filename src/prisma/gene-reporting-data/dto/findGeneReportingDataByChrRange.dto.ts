import { PrismaClient } from "@prisma/client"
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator"
import internal from "stream"
const prisma = new PrismaClient();

export class FindGeneReportingDataByChrRangeDto {

    @IsNotEmpty()
    @IsString()
    chrType: string
    @IsNotEmpty()
    @IsNumber()
    minChrNumber: number
    @IsNotEmpty()
    @IsNumber()
    maxChrNumber: number
    @IsNotEmpty()
    @IsNumber()
    geneReportingId: number


    
}
