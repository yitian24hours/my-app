import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'


@Injectable()
export class GeneReportingPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const Dto = plainToInstance(metadata.metatype, value);
    const errors = await validate(Dto)
    if(errors.length){
      throw new HttpException(errors,HttpStatus.BAD_REQUEST)
    }

    return value;
  }
}
