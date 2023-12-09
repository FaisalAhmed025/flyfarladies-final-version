import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExclusionsService } from './exclusions.service';
import { CreateExclusionDto } from './dto/create-exclusion.dto';
import { UpdateExclusionDto } from './dto/update-exclusion.dto';

@Controller('exclusions')
export class ExclusionsController {
  constructor(private readonly exclusionsService: ExclusionsService) {}

  @Post('add/:Id')
  create( 
   Id: string,
   @Body()  exclusionDto: CreateExclusionDto[]
   ) {
    return this.exclusionsService.AddpackageExclsuions(Id,exclusionDto);
  }

}
