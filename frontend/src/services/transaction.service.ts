import { api } from '../api/axios';
import type { TransactionDetail } from '../types/transaction-detail';

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

export interface CreateTransactionResponse {
  id: string;
  reference: string;
  status: string;
  total: string;
}

export async function createTransaction(
  data: CreateTransactionRequest,
): Promise<CreateTransactionResponse> {

  const response = await api.post<CreateTransactionResponse>(
    '/transactions',
    data,
  );

  return response.data;
}

export async function getTransactionById(
  id: string,
): Promise<TransactionDetail> {

  const response = await api.get<TransactionDetail>(
    `/transactions/${id}`,
  );

  return response.data;
}