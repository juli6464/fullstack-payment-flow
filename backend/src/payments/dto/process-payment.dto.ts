import { IsString } from 'class-validator';

export class ProcessPaymentDto {

  @IsString()
  transactionId: string;

  @IsString()
  cardNumber: string;

  @IsString()
  expMonth: string;

  @IsString()
  expYear: string;

  @IsString()
  cvc: string;

  @IsString()
  cardHolder: string;
}