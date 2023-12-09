
export class CreateTourpackageDto {
  MainTitle: string;
  SubTitle: string;
  Price: number;
  Location: string;
  couponCode: string;
  City: string
  Discount: number
  StartDate: Date;
  EndDate: Date;
  TripType: string;
  Country: string;
  AvailableSeats :number;
  MinimumAge: number;
  MaximumAge: number;
  TotalDuration: string
  PackageOverview: string;
  Availability: boolean;
  Showpackage: boolean;
  PricePerAdult: number;
  PricePerChild: number;
  PricePerInfant: number;
  CancellationDate:Date
  Nature:boolean
  Adventure:boolean
  GirlsTrip:boolean
  FamilyTrips:boolean
  Flight: boolean;
  Food: boolean;
  Transport: boolean;
  Hotel: boolean;
  FullyGuided:boolean
  SelfGuided:boolean
  Guide:boolean
  coverimageurl: string
  vipCoupon: string
  universalCoupon: string
  internationalCoupon: string
  domesticCoupon: string
  bucketCoupon: string
}
