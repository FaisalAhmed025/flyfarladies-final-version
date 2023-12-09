
import { Tourpackage } from 'src/tourpackage/entities/tourpackage.entity';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


export enum installmentstatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PAID = 'paid',
}

@Entity()
export class Installment {
  @PrimaryGeneratedColumn()
  InstallmentId: number;
  @Column()
  ABookingAmount: number;
  @Column()
  AFirstInstallmentAmount: number;
  @Column()
  ASecondInstallmentAmount: number;
  @Column()
  CBookingAmount: number;
  @Column()
  CFirstInstallmentAmount: number;
  @Column()
  CSecondInstallmentAmount: number;
  @Column()
  ISecondInstallmentAmount: number;
  @Column()
  IBookingAmount: number;
  @Column()
  IFirstInstallmentAmount: number;
  @Column({ type: 'date' })
  FirstInstallmentdueDate:Date
  @Column({ type: 'date' })
  SecondInstallmentdueDate:Date
  @Column({ type: 'date' })
  ThirdInstallmentdueDate:Date
  @Column()
  tourpackageId:string
}