import { PrismaClient } from "@prisma/client"
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator"
import internal from "stream"
const prisma = new PrismaClient();

export class FindGeneReportingDataMaxMinChrNumberDto {

    @IsNotEmpty()
    @IsString()
    chrType: string

    @IsNotEmpty()
    @IsNumber()
    geneReportingId: number


    
}
