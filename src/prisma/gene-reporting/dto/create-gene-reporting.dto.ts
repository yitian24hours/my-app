import { IsNotEmpty, IsString, Length } from "class-validator"

export class CreateGeneReportingDto {


    @IsNotEmpty({
        message: "报告名不能为空"
    })
    @IsString({
        message: "传入的参数应该为string类型"
    })
    @Length(1, 15, {
        message: "报告名长度应在1-15之间"
    })
    reportingName: string;


    des: string

}
