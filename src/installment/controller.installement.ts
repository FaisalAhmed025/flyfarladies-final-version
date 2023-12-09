import { Body, Controller, HttpStatus, Param, Post, Res,  } from "@nestjs/common";
import { TourpackageService } from "src/tourpackage/tourpackage.service";
import { InstallmentService } from "./service.installment";
import { CreateInstallmentDto } from "./dto/installment.dto";
import {Request, Response} from 'express'


@Controller('installment')
export class installmentController{
  constructor ( private readonly installmentService:InstallmentService ){}


  @Post('add/:Id')
  async createInstallment(
    @Param('Id') Id: string,
    @Res() res: Response,
    @Body() installmentDto: CreateInstallmentDto[],
  ) {
    await this.installmentService.AddInstallment(Id, installmentDto);
    return res
      .status(HttpStatus.OK)
      .send({
        status: 'success',
        message: 'installment added succesfully',
        data:installmentDto
      });
  }


}