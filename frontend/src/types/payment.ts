export interface ProcessPaymentRequest {
  transactionId: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvc: string;
  cardHolder: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  status: string;
  message: string;
  providerReference: string;
}