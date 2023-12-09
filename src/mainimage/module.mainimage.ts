import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MainImage } from "./entity/mainimage.entity";
import { MainimageController } from "./controller.mainimage";
import { MainimageService } from "./service.mainimage";
import { Tourpackage } from "src/tourpackage/entities/tourpackage.entity";
import { S3serviceService } from "src/s3service/s3service.service";
import { S3serviceModule } from "src/s3service/s3service.module";


@Module({
  imports:[TypeOrmModule.forFeature([MainImage,Tourpackage]), S3serviceModule],
  controllers:[MainimageController],
  providers:[MainimageService]
})

export class MainImageModule {}