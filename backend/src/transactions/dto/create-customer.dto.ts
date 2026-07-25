import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    example: 'Julian Alzate',
    description: 'Customer full name',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: 'julian@test.com',
    description: 'Customer email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '3001234567',
    description: 'Customer phone number',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;
}