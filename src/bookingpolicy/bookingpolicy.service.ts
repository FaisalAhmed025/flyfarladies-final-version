import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookingpolicyDto } from './dto/create-bookingpolicy.dto';
import { UpdateBookingpolicyDto } from './dto/update-bookingpolicy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tourpackage } from 'src/tourpackage/entities/tourpackage.entity';
import { Repository } from 'typeorm';
import { Bookingpolicy } from './entities/bookingpolicy.entity';

@Injectable()
export class BookingpolicyService {
  constructor(@InjectRepository(Tourpackage) private tourpackageRepo:Repository<Tourpackage>,
  @InjectRepository(Bookingpolicy) private bookingPolicyRepo:Repository<Bookingpolicy>,
  ){}

  //add booking policy
  async createbookingPolicy(Id: string, CreateBookingPolicyDto: CreateBookingpolicyDto[]) {
    const tourpackage = await this.tourpackageRepo.findOneBy({ Id });
    if (!tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add booking policy",
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdPolicies: Bookingpolicy[] = [];
    for (const CreatebookingPolicydto of CreateBookingPolicyDto) {
      if (CreatebookingPolicydto.BkId) {
        const existingbkpolicy = await this.bookingPolicyRepo.findOne({ where: { BkId: CreatebookingPolicydto.BkId } })
        if (!existingbkpolicy) {
          throw new HttpException('booking policy not found', HttpStatus.NOT_FOUND)
        }
        Object.assign(existingbkpolicy, CreatebookingPolicydto)
        await this.bookingPolicyRepo.save(existingbkpolicy)
        createdPolicies.push(existingbkpolicy)
      }
      else {
        const creatpolicy = await this.bookingPolicyRepo.create({ ...CreatebookingPolicydto, tourpackageId:tourpackage.Id });
        const createdpolicy = await this.bookingPolicyRepo.save(creatpolicy)
        createdPolicies.push(createdpolicy);
      }
    }
    return createdPolicies;
  }
}
