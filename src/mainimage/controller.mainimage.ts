import { Controller, Param, Post, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { MainimageService } from "./service.mainimage";
import { Response } from "express";
import { FilesInterceptor } from "@nestjs/platform-express";


@Controller('mainimage')
export class MainimageController{
  constructor(private readonly mainimageService:MainimageService) {}




  
  @Post('add/:Id')
  @UseInterceptors(FilesInterceptor('MainImageUrl', 20))
  async addMainImage(
  @UploadedFiles()  files: Express.Multer.File[],
  @Param('Id') Id: string,
  @Res() res:Response
  ){
    return await this.mainimageService.AddmainImages(files,Id,res)
  }

  
}