import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TourpackageModule } from './tourpackage/tourpackage.module';
import { S3serviceModule } from './s3service/s3service.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tourpackage } from './tourpackage/entities/tourpackage.entity';
import { ExclusionsModule } from './exclusions/exclusions.module';
import { Exclusion } from './exclusions/entities/exclusion.entity';
import { InclusionsModule } from './inclusions/inclusions.module';
import { Inclusion } from './inclusions/entities/inclusion.entity';
import { BookingpolicyModule } from './bookingpolicy/bookingpolicy.module';
import { Bookingpolicy } from './bookingpolicy/entities/bookingpolicy.entity';
import { installmentModule } from './installment/installment.module';
import { Installment } from './installment/entity/installment.entity';
import { MainImageModule } from './mainimage/module.mainimage';
import { MainImage } from './mainimage/entity/mainimage.entity';

@Module({
  imports: [ ConfigModule.forRoot({ isGlobal:true, envFilePath: '.env'}),
  TypeOrmModule.forRoot({
     type:'mysql',
     username:'root',
      password:'',
      host: '127.0.0.1', 
      database:'newffl',
      port:3306,
      entities:[Tourpackage, Exclusion, Inclusion, Bookingpolicy, Installment, MainImage],
      synchronize:true
  }),
   TourpackageModule, S3serviceModule, ExclusionsModule, InclusionsModule, BookingpolicyModule,installmentModule, MainImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
