import { IsNotEmpty } from "class-validator";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

export enum AdventureType {
  Nature = 'nature',
  Adventure = 'adventure',
  GirlsType = 'Girls Trip',
  FamilyTrips = 'Family Trips',
  // Add other adventure types as needed
}

export enum GuideType {
  FullyGuided = 'Fully Guided',
  SelfGuided = 'Independent',
  // Add other guide types as needed
}

export enum Facilities {
  Transport = 'Transport',
  Meals = 'Meals',
  Accomodation = 'Accomodation',
  Gude = "Guide"
  // Add other facilities as needed
}

let userCount = Math.floor(Math.random() * 10000);

@Entity()
export class Tourpackage {

  @PrimaryColumn()
    Id:string
    @BeforeInsert()
    generateUserId() {
       userCount++;
       this.Id = `FFLPK${100 + userCount}`;
    }
    @Column({ nullable: true })
    MainTitle: string;
    @Column({ nullable: true })
    SubTitle: string;
    @Column({ nullable: true })
    Price: number;
    @Column({ nullable: true })
    Location: string;
    @Column({ nullable: true })
    couponCode: string;
    @Column({ nullable: true })
    City: string
    @Column({ nullable: true })
    Discount: number
    @Column({default:null,type:'date' })
    StartDate: Date;
    @Column({default:null,type:'date' })
    EndDate: Date;
    @Column({ nullable: true })
    TripType: string;
    @Column({ nullable: true })
    Country: string;
    @Column({ default:0,type: 'integer'  })
    AvailableSeats :number;
    @Column({ type: 'integer' })
    MinimumAge: number;
    @Column({ type: 'integer' })      
    MaximumAge: number;
    @Column({ nullable: true })
    TotalDuration: string
    @Column({ nullable: true,length: 1000 })
    PackageOverview: string;
    @Column('boolean', { default: false, nullable: true })
    Availability: boolean;
    @Column('boolean', { default: false, nullable: true })
    Showpackage: boolean;
    @Column()
    PricePerAdult: number;
    @Column()
    PricePerChild: number;
    @Column()
    PricePerInfant: number;
    @Column({default:null,type:'date' })
    CancellationDate:Date
    @Column('boolean', { default: false })
    Nature:boolean
    @Column('boolean', { default: false })
    Adventure:boolean
    @Column('boolean', { default: false })
    GirlsTrip:boolean
    @Column('boolean', { default: false })
    FamilyTrips:boolean
    @Column('boolean', { default: false })
    Flight: boolean;
    @Column('boolean', { default: false})
    Food: boolean;
    @Column('boolean', { default: false })
    Transport: boolean;
    @Column('boolean', { default: false})
    Hotel: boolean;
    @Column('boolean', { default: false })
    FullyGuided:boolean
    @Column('boolean', { default: false})
    SelfGuided:boolean
    @Column('boolean', { default: false })
    Guide:boolean
    @IsNotEmpty({message:'coverimageurl could not be empty'})
    @Column()
    coverimageurl: string
    @Column({nullable:true})
    vipCoupon: string
    @Column()
    universalCoupon: string
    @Column()
    internationalCoupon: string
    @Column()
    domesticCoupon: string
    @Column()
    bucketCoupon: string

}

