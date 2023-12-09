import { Module } from '@nestjs/common';
import { InclusionsService } from './inclusions.service';
import { InclusionsController } from './inclusions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inclusion } from './entities/inclusion.entity';
import { Tourpackage } from 'src/tourpackage/entities/tourpackage.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Inclusion, Tourpackage])],
  controllers: [InclusionsController],
  providers: [InclusionsService],
})
export class InclusionsModule {}
