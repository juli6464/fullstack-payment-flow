export interface CreateTransactionRequest {
  productId: string;

  customer: {
    fullName: string;
    email: string;
    phone: string;
  };

  delivery: {
    address: string;
    city: string;
    department: string;
    postalCode: string;
  };
}

export interface TransactionResponse {
  id: string;
  reference: string;
  status: string;
  total: number;
}