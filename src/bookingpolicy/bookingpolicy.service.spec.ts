import { Test, TestingModule } from '@nestjs/testing';
import { BookingpolicyService } from './bookingpolicy.service';

describe('BookingpolicyService', () => {
  let service: BookingpolicyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingpolicyService],
    }).compile();

    service = module.get<BookingpolicyService>(BookingpolicyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
