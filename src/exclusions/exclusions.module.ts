import { Module } from '@nestjs/common';
import { ExclusionsService } from './exclusions.service';
import { ExclusionsController } from './exclusions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tourpackage } from 'src/tourpackage/entities/tourpackage.entity';
import { Exclusion } from './entities/exclusion.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Tourpackage, Exclusion])],
  controllers: [ExclusionsController],
  providers: [ExclusionsService],
})
export class ExclusionsModule {}
