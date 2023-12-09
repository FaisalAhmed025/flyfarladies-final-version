import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Bookingpolicy {
 
  @PrimaryGeneratedColumn()
  BkId: number
  @IsNotEmpty()
  @Column()
  description:string;
  @Column()
  tourpackageId:string

}
