import { Body, HttpException, HttpStatus, Injectable, Param, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { Tourpackage } from "src/tourpackage/entities/tourpackage.entity";
import { Repository } from "typeorm";
import { MainImage } from "./entity/mainimage.entity";
import { S3serviceService } from "src/s3service/s3service.service";
import {Request, Response} from 'express'


@Injectable()

export class MainimageService{

constructor (
  @InjectRepository(Tourpackage) private tourpackageRepo:Repository<Tourpackage>,
  @InjectRepository(MainImage) private MainimageRepo:Repository<MainImage>,
  private readonly  s3service:S3serviceService
  ){}

  @UseInterceptors(FilesInterceptor('MainImageUrl', 20))
  async AddmainImages(
    @UploadedFiles()
    files: Express.Multer.File[],
    Id: string,
    @Res() res: Response,
  ) {
    const tourpackage = await this.tourpackageRepo.findOneBy({ Id });
    if (!tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add main image",
        HttpStatus.BAD_REQUEST,
      );
    }

    for (const file of files) {
      const coverimageurl = await this.s3service.Addimage(file);
      const mainimage = new MainImage();
      mainimage.MainImageUrl = coverimageurl;
      await this.MainimageRepo.save({ ...mainimage, tourpackageId:tourpackage.Id });
    }
    return res.status(HttpStatus.OK).send({
      status: 'success',
      message: 'Main image added successfully',
    });
  }


}