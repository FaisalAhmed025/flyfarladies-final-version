import { Controller } from '@nestjs/common';
import { S3serviceService } from './s3service.service';

@Controller('s3service')
export class S3serviceController {
  constructor(private readonly s3serviceService: S3serviceService) {}
}
