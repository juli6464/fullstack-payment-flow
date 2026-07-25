import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

import { CreateCustomerDto } from './create-customer.dto';
import { CreateDeliveryDto } from './create-delivery.dto';

export class CreateTransactionDto {
  @ApiProperty({
    example: 'cms0gndzm0000szk8rzk7q1iu',
  })
  @IsString()
  productId: string;

  @ApiProperty({
    type: CreateCustomerDto,
  })
  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customer: CreateCustomerDto;

  @ApiProperty({
    type: CreateDeliveryDto,
  })
  @ValidateNested()
  @Type(() => CreateDeliveryDto)
  delivery: CreateDeliveryDto;
}