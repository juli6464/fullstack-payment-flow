import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProcessPaymentDto } from './dto/process-payment.dto';
import { PaymentsService } from './payments.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
  ) {}

  @Post('process')
  @ApiOperation({ summary: 'Process a payment' })
  @ApiResponse({
    status: 200,
    description: 'Payment processed successfully',
  })
  process(@Body() dto: ProcessPaymentDto) {
    return this.paymentsService.processPayment(dto);
  }
}