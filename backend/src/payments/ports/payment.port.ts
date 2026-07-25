import { ProcessPaymentDto } from '../dto/process-payment.dto';
import { PaymentResponse } from '../interfaces/payment-response.interface';

export const PAYMENT_PORT = 'PAYMENT_PORT';

export interface PaymentPort {
  processPayment(
    dto: ProcessPaymentDto,
  ): Promise<PaymentResponse>;
}