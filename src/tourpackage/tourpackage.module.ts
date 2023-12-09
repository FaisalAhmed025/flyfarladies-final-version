import { Module } from '@nestjs/common';
import { TourpackageService } from './tourpackage.service';
import { TourpackageController } from './tourpackage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tourpackage } from './entities/tourpackage.entity';
import { S3serviceModule } from 'src/s3service/s3service.module';
import { Inclusion } from 'src/inclusions/entities/inclusion.entity';
import { Exclusion } from 'src/exclusions/entities/exclusion.entity';
import { Bookingpolicy } from 'src/bookingpolicy/entities/bookingpolicy.entity';
import { Installment } from 'src/installment/entity/installment.entity';
import { MainImage } from 'src/mainimage/entity/mainimage.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Tourpackage, Inclusion, Exclusion, Bookingpolicy, Installment, MainImage]), S3serviceModule],
  controllers: [TourpackageController],
  providers: [TourpackageService],
  exports:[TourpackageService]
})
export class TourpackageModule {}
