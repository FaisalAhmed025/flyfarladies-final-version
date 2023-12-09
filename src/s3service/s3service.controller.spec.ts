import { Test, TestingModule } from '@nestjs/testing';
import { S3serviceController } from './s3service.controller';
import { S3serviceService } from './s3service.service';

describe('S3serviceController', () => {
  let controller: S3serviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [S3serviceController],
      providers: [S3serviceService],
    }).compile();

    controller = module.get<S3serviceController>(S3serviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
