import { api } from '../api/axios';

import {
  PaymentResponse,
  ProcessPaymentRequest,
} from '../types/payment';

export async function processPayment(
  data: ProcessPaymentRequest,
): Promise<PaymentResponse> {
  const response = await api.post<PaymentResponse>(
    '/payments/process',
    data,
  );

  return response.data;
}