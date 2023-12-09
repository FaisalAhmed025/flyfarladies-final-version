import { HttpStatus, Injectable, Res, UploadedFiles } from '@nestjs/common';
import { CreateTourpackageDto } from './dto/create-tourpackage.dto';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tourpackage } from './entities/tourpackage.entity';
import { Response, Request } from 'express'
import { S3serviceService } from 'src/s3service/s3service.service';
import { Inclusion } from 'src/inclusions/entities/inclusion.entity';
import { Exclusion } from 'src/exclusions/entities/exclusion.entity';
import { Bookingpolicy } from 'src/bookingpolicy/entities/bookingpolicy.entity';
import { Installment } from 'src/installment/entity/installment.entity';
import { MainImage } from 'src/mainimage/entity/mainimage.entity';

@Injectable()
export class TourpackageService {
  constructor(
    @InjectRepository(Tourpackage) private tourpackageRepo: Repository<Tourpackage>,
    @InjectRepository(Inclusion) private inclusionsRepo: Repository<Inclusion>,
    @InjectRepository(Exclusion) private exclusionsRepo: Repository<Exclusion>,
    @InjectRepository(Bookingpolicy) private BookingpolicyRepo: Repository<Bookingpolicy>,
    @InjectRepository(Installment)  private installmentRepo:Repository<Installment>,
    @InjectRepository(MainImage)  private mainimageRepo:Repository<MainImage>,
    private s3Service: S3serviceService
  ) { }

  async create(
    @UploadedFiles() file: { coverimageurl?: Express.Multer.File[] },
    @Res() res: Response,
    createTourpackageDto: CreateTourpackageDto) {
    let coverimageurl;
    if (file.coverimageurl && file.coverimageurl.length > 0) {
      coverimageurl = await this.s3Service.Addimage(file.coverimageurl[0])
    }
    createTourpackageDto.coverimageurl = coverimageurl
    const tourpackage = await this.tourpackageRepo.create(createTourpackageDto)
    await this.tourpackageRepo.save(tourpackage)
    return res
      .status(HttpStatus.CREATED)
      .send({
        status: 'success',
        message: 'Travel package Added succesfully',
      });
  }



  async getallpackage() {
    const tourPackages = await this.tourpackageRepo.find();
    const allpackages = await Promise.all(
      tourPackages.map(async (tourpackage) => {

        const exclusions = await this.exclusionsRepo.find({
          where: { tourpackageId: tourpackage.Id },
        });

         exclusions.map((exclusion) => ({
          PackageExclusions: exclusion.PackageExclusions,
          tourpackageId: exclusion.tourpackageId,
          ExId: exclusion.ExId,
        }))


        const inclusion = await this.inclusionsRepo.find({ where: { tourpackageId: tourpackage.Id } })

       inclusion.map((inclusion) => ({
          Inclusions: inclusion.Inclusions,
          InId: inclusion.InId,
          tourpackageId: inclusion.tourpackageId,

        }))

        const bookingpolicy = await this.BookingpolicyRepo.find({where:{tourpackageId:tourpackage.Id}})

        bookingpolicy.map((bookingpolicy)=>(
          {
            BkId: bookingpolicy.BkId,
            description:bookingpolicy.description,
            tourpackageId:bookingpolicy.tourpackageId
          })
        )

        const mainimage = await this.mainimageRepo.find({where:{tourpackageId:tourpackage.Id}})
        mainimage.map((mainimage)=>({
          mainimgId:mainimage.mainimgId,
          MainImageUrl:mainimage.MainImageUrl,
          tourpackageId:mainimage.tourpackageId

        }))
        
        const installment  = await this.installmentRepo.find({where:{tourpackageId:tourpackage.Id}})
        installment.map((installment)=>({
          ABookingAmount:installment.ABookingAmount,
          AFirstInstallmentAmount:installment.AFirstInstallmentAmount,
          ASecondInstallmentAmount:installment.ASecondInstallmentAmount,
          CBookingAmount:installment.CBookingAmount,
          CFirstInstallmentAmount:installment.CFirstInstallmentAmount,
          CSecondInstallmentAmount:installment.CSecondInstallmentAmount,
          IBookingAmount:installment.IBookingAmount,
          IFirstInstallmentAmount:installment.IFirstInstallmentAmount,
          ISecondInstallmentAmount:installment.ISecondInstallmentAmount,
          FirstInstallmentdueDate:installment.FirstInstallmentdueDate,
          SecondInstallmentdueDate:installment.SecondInstallmentdueDate,
          ThirdInstallmentdueDate:installment.ThirdInstallmentdueDate

        }))

        return {
          ...tourpackage,
          exlsuions: exclusions,
          inclusions: inclusion,
          bookingpolicy:bookingpolicy,
          installemnt:installment,
          mianimage:mainimage
        };
      }),
    );
    return {Tourpackages:allpackages};
  }

}
