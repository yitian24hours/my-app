import { PrismaClient } from "@prisma/client"
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator"
import internal from "stream"
const prisma = new PrismaClient();

export class CreateGeneReportingDatumDto {

    @IsNotEmpty()
    @IsString()
    chrType: string
    @IsNotEmpty()
    @IsNumber()
    chrStart: number
    @IsNotEmpty()
    @IsNumber()
    chrEnd: number
    @IsNotEmpty()
    @IsNumber()
    chrValue: number
    @IsNotEmpty()
    @IsNumber()
    geneReportingId: number


    
}
