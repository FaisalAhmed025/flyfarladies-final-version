import { Module } from '@nestjs/common';
import { S3serviceService } from './s3service.service';
import { S3serviceController } from './s3service.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[ConfigModule],
  controllers: [S3serviceController],
  providers: [S3serviceService],
  exports:[S3serviceService]
})
export class S3serviceModule {}
