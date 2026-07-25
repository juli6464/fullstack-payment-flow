import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

import { CreateCustomerDto } from './create-customer.dto';
import { CreateDeliveryDto } from './create-delivery.dto';

export class CreateTransactionDto {
  @IsString()
  productId: string;

  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customer: CreateCustomerDto;

  @ValidateNested()
  @Type(() => CreateDeliveryDto)
  delivery: CreateDeliveryDto;
}