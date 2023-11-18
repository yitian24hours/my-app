import { Controller, Get, HttpException, HttpStatus,Request,Response } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
import { join } from 'path';

const prisma = new PrismaClient();
const root = join(process.cwd(),"public");

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Request() req,@Response() res) {
    
    console.log(root)
    return res.send(join(root,"index1.html"))
  }
}
