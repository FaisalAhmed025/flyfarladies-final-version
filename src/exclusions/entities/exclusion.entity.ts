import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Exclusion {
  @PrimaryGeneratedColumn()
  ExId:number
  @Column()
  PackageExclusions:string
  @Column()
  tourpackageId:string

}
