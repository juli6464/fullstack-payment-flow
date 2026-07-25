import { Injectable } from '@nestjs/common';

import { ProcessPaymentDto } from '../dto/process-payment.dto';
import { PaymentResponse } from '../interfaces/payment-response.interface';
import { PaymentPort } from '../ports/payment.port';

@Injectable()
export class PaymentProvider implements PaymentPort {
  async processPayment(
    dto: ProcessPaymentDto,
  ): Promise<PaymentResponse> {
    return {
      success: true,
      transactionId: dto.transactionId,
      status: 'APPROVED',
      message: 'Mock payment approved',
      providerReference: 'MOCK-123456',
    };
  }
}