import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tourpackage } from "src/tourpackage/entities/tourpackage.entity";
import { Installment } from "./entity/installment.entity";
import { InstallmentService } from "./service.installment";
import { installmentController } from "./controller.installement";



@Module({
  imports:[TypeOrmModule.forFeature([Tourpackage, Installment])],
  controllers:[installmentController],
  providers:[InstallmentService],
})
export class installmentModule {}