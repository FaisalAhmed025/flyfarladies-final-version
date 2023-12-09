import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingpolicyDto } from './create-bookingpolicy.dto';

export class UpdateBookingpolicyDto extends PartialType(CreateBookingpolicyDto) {}
