import { Test, TestingModule } from '@nestjs/testing';
import { InclusionsController } from './inclusions.controller';
import { InclusionsService } from './inclusions.service';

describe('InclusionsController', () => {
  let controller: InclusionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InclusionsController],
      providers: [InclusionsService],
    }).compile();

    controller = module.get<InclusionsController>(InclusionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
