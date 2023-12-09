import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus } from '@nestjs/common';
import { BookingpolicyService } from './bookingpolicy.service';
import { CreateBookingpolicyDto } from './dto/create-bookingpolicy.dto';
import { UpdateBookingpolicyDto } from './dto/update-bookingpolicy.dto';
import {Request, Response}  from 'express'

@Controller('bookingpolicy')
export class BookingpolicyController {
  constructor(private readonly bookingpolicyService: BookingpolicyService) {}

  @Post(':Id/add')
 async  addTourPackageBookingPolicy(
    @Param('Id') Id: string,
    @Body() bookingpolicydto: CreateBookingpolicyDto[],
    @Req() req: Request,
    @Res() res: Response,
  ) {
   await  this.bookingpolicyService.createbookingPolicy(Id, bookingpolicydto);
    return res.status(HttpStatus.OK).json({
      status: 'success',
      message: 'booking policy added',
    });
  }
}
