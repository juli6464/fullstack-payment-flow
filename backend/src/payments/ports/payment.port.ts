import { Prisma } from '@prisma/client';

import { ProcessPaymentDto } from '../dto/process-payment.dto';
import { PaymentResponse } from '../interfaces/payment-response.interface';

export const PAYMENT_PORT = 'PAYMENT_PORT';

export type TransactionWithRelations =
  Prisma.TransactionGetPayload<{
    include: {
      product: true;
      customer: true;
      delivery: true;
    };
  }>;

export interface PaymentPort {
  processPayment(
    dto: ProcessPaymentDto,
    transaction: TransactionWithRelations,
  ): Promise<PaymentResponse>;
}