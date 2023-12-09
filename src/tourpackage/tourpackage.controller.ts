import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { TourpackageService } from './tourpackage.service';
import { CreateTourpackageDto } from './dto/create-tourpackage.dto';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import {Request, Response } from 'express'
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('tourpackage')
export class TourpackageController {
  constructor(private readonly tourpackageService: TourpackageService) {}


  @UseInterceptors(FileFieldsInterceptor([
    {name:'coverimageurl', maxCount:1}
  ]))
  @Post('Addpackage')
  create(
      @UploadedFiles()  file:{coverimageurl?:Express.Multer.File[]},
      @Res() res:Response,
      @Body() createTourpackageDto: CreateTourpackageDto,
    ) {
    return this.tourpackageService.create(file,res,createTourpackageDto);
  }

  @Get('all')
  async  getallpackage( 
   ) {
    return await this.tourpackageService.getallpackage()
  }


  }

