import { api } from '../api/axios';

export interface ProcessPaymentRequest {
  transactionId: string;
  cardHolder: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvc: string;
}

export interface ProcessPaymentResponse {
  success: boolean;
  transactionId: string;
  status: string;
  message: string;
  providerReference: string;
}

export async function processPayment(
  data: ProcessPaymentRequest,
): Promise<ProcessPaymentResponse> {

  const response = await api.post<ProcessPaymentResponse>(
    '/payments/process',
    data,
  );

  return response.data;
}