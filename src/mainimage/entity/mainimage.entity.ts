import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class MainImage{
   @PrimaryGeneratedColumn()
   mainimgId: number;
   @Column()
   MainImageUrl: string;
   @Column()
   tourpackageId:string
  
   
}