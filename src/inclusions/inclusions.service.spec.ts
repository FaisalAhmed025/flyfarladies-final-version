import { Test, TestingModule } from '@nestjs/testing';
import { InclusionsService } from './inclusions.service';

describe('InclusionsService', () => {
  let service: InclusionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InclusionsService],
    }).compile();

    service = module.get<InclusionsService>(InclusionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
