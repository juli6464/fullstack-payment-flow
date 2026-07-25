import { TransactionStatus } from '@prisma/client';

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  status: TransactionStatus;
  message: string;
  providerReference: string;
}