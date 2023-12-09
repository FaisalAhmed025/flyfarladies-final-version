import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"



@Entity()
export class Inclusion {
  @PrimaryGeneratedColumn()
  InId:number
  @Column()
  Inclusions:string
  @Column()
  tourpackageId:string
}
