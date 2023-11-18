import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors,UploadedFile } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor,FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("gene-reporting")
  @UseInterceptors(FileInterceptor("file"))
  uploadGeneReporting(@UploadedFile() file){

    return this.uploadService.uploadGeneReporting(file);
  }


}
