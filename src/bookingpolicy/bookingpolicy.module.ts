import { Module } from '@nestjs/common';
import { BookingpolicyService } from './bookingpolicy.service';
import { BookingpolicyController } from './bookingpolicy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookingpolicy } from './entities/bookingpolicy.entity';
import { Tourpackage } from 'src/tourpackage/entities/tourpackage.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Bookingpolicy, Tourpackage])],
  controllers: [BookingpolicyController],
  providers: [BookingpolicyService],
})
export class BookingpolicyModule {}
