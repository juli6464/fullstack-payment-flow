import { Box, Typography } from '@mui/material';
import {
  Navigate,
  useNavigate,
} from 'react-router-dom';

import OrderSummary from '../checkout/OrderSummary';
import CheckoutForm from '../checkout/CheckoutForm';

import MainLayout from '../layout/MainLayout';

import { useAppSelector } from '../store/hooks';

import type { CheckoutFormData } from '../schemas/checkout.schema';

import { createTransaction } from '../services/transaction.service';
import { processPayment } from '../services/payment.service';

export default function CheckoutPage() {

  const navigate = useNavigate();

  const product = useAppSelector(
    (state) => state.checkout.selectedProduct,
  );

  if (!product) {
    return <Navigate to="/" replace />;
  }

  async function handleCheckout(
    data: CheckoutFormData,
  ) {
    try {

      // 1. Crear transacción

      const transaction =
        await createTransaction({
          productId: product.id,

          customer: {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
          },

          delivery: {
            address: data.address,
            city: data.city,
            department: 'Caldas',
            postalCode: '170001',
          },
        });

      console.log(
        'Transaction:',
        transaction,
      );

      // 2. Procesar pago

      const payment =
        await processPayment({
          transactionId: transaction.id,

          cardHolder: data.cardHolder,
          cardNumber: data.cardNumber,
          expMonth: data.expMonth,
          expYear: data.expYear,
          cvc: data.cvc,
        });

      console.log(
        'Payment:',
        payment,
      );

      // 3. Validar respuesta

      if (payment.status === 'APPROVED') {

        navigate('/success');

      } else {

        navigate('/failed', {
            state: {
                status: payment.status,
            },
        });

      }

    } catch (error) {

      console.error(error);

      navigate('/failed');

    }
  }

  return (
    <MainLayout>

      <Typography
        variant="h4"
        sx={{ mb: 4 }}
      >
        Checkout
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 1fr',
          },
          gap: 4,
        }}
      >

        <OrderSummary
          product={product}
        />

        <Box>

          <CheckoutForm
            onSubmit={handleCheckout}
          />

        </Box>

      </Box>

    </MainLayout>
  );
}