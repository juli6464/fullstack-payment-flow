import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProcessPaymentDto {
  @ApiProperty({
    example: 'cms0julfp0007sz9sd8zd5t3x',
    description: 'Transaction ID',
  })
  @IsString()
  @IsNotEmpty()
  transactionId: string;

  @ApiProperty({
    example: '4242424242424242',
  })
  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  @ApiProperty({
    example: '12',
  })
  @IsString()
  @IsNotEmpty()
  expMonth: string;

  @ApiProperty({
    example: '29',
  })
  @IsString()
  @IsNotEmpty()
  expYear: string;

  @ApiProperty({
    example: '123',
  })
  @IsString()
  @IsNotEmpty()
  cvc: string;

  @ApiProperty({
    example: 'Julian Alzate',
  })
  @IsString()
  @IsNotEmpty()
  cardHolder: string;
}