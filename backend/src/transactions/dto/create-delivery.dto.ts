import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsOptional()
  @IsString()
  postalCode?: string;
}