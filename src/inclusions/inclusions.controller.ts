import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus } from '@nestjs/common';
import { InclusionsService } from './inclusions.service';
import { CreateInclusionDto } from './dto/create-inclusion.dto';
import { UpdateInclusionDto } from './dto/update-inclusion.dto';
import {Request, Response}  from 'express'

@Controller('inclusions')
export class InclusionsController {
  constructor(private readonly inclusionsService: InclusionsService) {}

  @Post(':Id/AddPackageInclusions')
  async addInclusion(
    @Param('Id') Id: string,
    @Body() Inclusionsdto: CreateInclusionDto[],
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.inclusionsService.AddInclusions(Id, Inclusionsdto);
    return res.status(HttpStatus.OK).json({
      status: 'success',
      message: 'travel package Inlclusions Iteam Added',
    });
  }
}
