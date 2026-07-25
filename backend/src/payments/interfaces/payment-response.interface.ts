export interface PaymentResponse {
  success: boolean;

  transactionId: string;

  status: 'APPROVED' | 'DECLINED' | 'ERROR';

  message: string;

  providerReference?: string;
}