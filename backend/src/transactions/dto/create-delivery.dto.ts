import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @ApiProperty({
    example: 'Cra 10 #20-30',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 'Manizales',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: 'Caldas',
  })
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty({
    example: '170001',
    required: false,
  })
  @IsOptional()
  @IsString()
  postalCode?: string;
}