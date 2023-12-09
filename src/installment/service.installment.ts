import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Installment } from "./entity/installment.entity";
import { Repository } from "typeorm";
import { Tourpackage } from "src/tourpackage/entities/tourpackage.entity";
import { CreateInstallmentDto } from "./dto/installment.dto";


@Injectable()
export class InstallmentService{
  constructor(
    @InjectRepository(Tourpackage) private tourpackageRepo:Repository<Tourpackage>,
    @InjectRepository(Installment)  private installmentRepo:Repository<Installment>){}


    async AddInstallment(Id: string, CreateInstallmentDto: CreateInstallmentDto[]) {
      const tourpackage = await this.tourpackageRepo.findOneBy({ Id })
      if (!tourpackage) {
        throw new HttpException(
          "TourPackage not found",
          HttpStatus.BAD_REQUEST,
        );
      }
      const createinstallment: Installment[] = [];
      for (const installmentdto of CreateInstallmentDto) {
        if (installmentdto.InstallmentId) {
          const existinstallment = await this.installmentRepo.findOne({ where: { InstallmentId: installmentdto.InstallmentId }})
          if (!existinstallment) {
            throw new HttpException(`Installment with ID ${installmentdto.InstallmentId} not found`, HttpStatus.NOT_FOUND);
          }
          Object.assign(existinstallment, installmentdto);
          await this.installmentRepo.save(existinstallment);
          createinstallment.push(existinstallment);
        } else {
          const newinstallment = await this.installmentRepo.create({ ...installmentdto, tourpackageId:tourpackage.Id })
          const createdinstallment = await this.installmentRepo.save(newinstallment)
          createinstallment.push(createdinstallment);
        }
      }
      return createinstallment
    }

}