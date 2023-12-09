import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExclusionDto } from './dto/create-exclusion.dto';
import { UpdateExclusionDto } from './dto/update-exclusion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tourpackage } from 'src/tourpackage/entities/tourpackage.entity';
import { Repository } from 'typeorm';
import { Exclusion } from './entities/exclusion.entity';

@Injectable()
export class ExclusionsService {
  constructor(
    @InjectRepository(Tourpackage) private tourpackageRepo:Repository<Tourpackage>,
  @InjectRepository(Exclusion) private exclusionsRepo:Repository<Exclusion>,
  ){}

  async AddpackageExclsuions(
    Id: string,
    exclusionDto: CreateExclusionDto[],
  ) {

    const tourpackage = await this.tourpackageRepo.findOneBy({ Id });
    if (!tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
    }

    const exclsuinsarray: CreateExclusionDto[] = []
    for (const exclusiondto of exclusionDto) {
      if (exclusiondto.ExId) {
        const existingexclsuions = await this.exclusionsRepo.findOne({ where: { ExId: exclusiondto.ExId }, relations: ['tourpackage'] })
        if (!existingexclsuions) {
          throw new HttpException('exlusions not found', HttpStatus.NOT_FOUND)
        }
        Object.assign(existingexclsuions, exclusiondto)
        await this.exclusionsRepo.save(existingexclsuions)
        exclsuinsarray.push(existingexclsuions)
      } else {
        const newExclsuions = await this.exclusionsRepo.create({...exclusiondto, tourpackageId:tourpackage.Id});
        const saveexclsuions = await this.exclusionsRepo.save(newExclsuions)
        exclsuinsarray.push(saveexclsuions);
      }

    }
    return exclsuinsarray;
  }


  // In your tourpackage.service.ts



}
