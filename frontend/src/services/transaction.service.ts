import { api } from '../api/axios';

import {
  CreateTransactionRequest,
  TransactionResponse,
} from '../types/transaction';

export async function createTransaction(
  data: CreateTransactionRequest,
): Promise<TransactionResponse> {
  const response = await api.post<TransactionResponse>(
    '/transactions',
    data,
  );

  return response.data;
}

export async function getTransaction(id: string) {
  const response = await api.get(`/transactions/${id}`);

  return response.data;
}

export async function getTransactions() {
  const response = await api.get('/transactions');

  return response.data;
}