import { ApiProperty } from "@nestjs/swagger";



export class CreateInstallmentDto{
  InstallmentId:number
  @ApiProperty()
  BookingAmount:number
  @ApiProperty()
  FirstInstallmentAmount: number;
  @ApiProperty()
  FirstInstallmentdueDate: Date;
  @ApiProperty()
  SecondInstallmentAmount: number;
  @ApiProperty()
  SecondInstallmentdueDate:Date;
  tourpackageId:string
}