import { Test, TestingModule } from '@nestjs/testing';
import { BookingpolicyController } from './bookingpolicy.controller';
import { BookingpolicyService } from './bookingpolicy.service';

describe('BookingpolicyController', () => {
  let controller: BookingpolicyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingpolicyController],
      providers: [BookingpolicyService],
    }).compile();

    controller = module.get<BookingpolicyController>(BookingpolicyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
