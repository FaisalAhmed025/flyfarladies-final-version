import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInclusionDto } from './dto/create-inclusion.dto';
import { UpdateInclusionDto } from './dto/update-inclusion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tourpackage } from 'src/tourpackage/entities/tourpackage.entity';
import { Repository } from 'typeorm';
import { Inclusion } from './entities/inclusion.entity';

@Injectable()
export class InclusionsService {
  constructor(@InjectRepository(Tourpackage) private tourpackageRepo:Repository<Tourpackage>,
  @InjectRepository(Inclusion) private InclusionRepo:Repository<Inclusion>,
  ){}
  

  
  async AddInclusions(
    Id: string,
    inclusionsDto: CreateInclusionDto[]
  ) {
    const tourpackage = await this.tourpackageRepo.findOne({ where:{Id} });
    if (!tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
    }
    const inclusiinsarray: Inclusion[] = []
    for (const inclusionsdto of inclusionsDto) {
      if (inclusionsdto.InId) {
        const existinginclusions = await this.InclusionRepo.findOne({ where: { InId: inclusionsdto.InId } })
        if (!existinginclusions) {
          throw new HttpException('inclusion not found', HttpStatus.NOT_FOUND)
        }
        Object.assign(existinginclusions, inclusionsdto);
        await this.InclusionRepo.save(existinginclusions)
        inclusiinsarray.push(existinginclusions)
      } else {
        const newInclusions = await this.InclusionRepo.create({ ...inclusionsdto, tourpackageId:tourpackage.Id });
        const saveinclusions = await this.InclusionRepo.save(newInclusions)
        inclusiinsarray.push(saveinclusions);
      }
    }
    return inclusiinsarray;
  }
}
