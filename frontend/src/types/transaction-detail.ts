export interface TransactionDetail {

  id: string;
  reference: string;
  status: string;

  productAmount: string;
  baseFee: string;
  deliveryFee: string;
  total: string;

  wompiTransactionId: string;

  createdAt: string;
  updatedAt: string;

  product: {
    id: string;
    name: string;
    description: string;
    image: string;
    price: string;
    stock: number;
  };

  customer: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
  };

  delivery: {
    id: string;
    address: string;
    city: string;
    department: string;
    postalCode: string;
  };
}