import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response } from './common/response/res';
import { HttpFilter } from './common/filter/filter'
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  app.useGlobalInterceptors(new Response())
  app.useGlobalFilters(new HttpFilter())
  app.useGlobalPipes(new ValidationPipe())
  console.log(__dirname,"public")
  app.useStaticAssets(join(__dirname,"public"))
  
  
  await app.listen(3000);


}
bootstrap();
