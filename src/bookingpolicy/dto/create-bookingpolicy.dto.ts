import { IsNotEmpty } from "class-validator";


export class CreateBookingpolicyDto {

  BkId: number
  description:string;
  tourpackageId:string
}
