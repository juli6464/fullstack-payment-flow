import { useState } from "react";

import { Box, CircularProgress, Backdrop, Typography } from "@mui/material";

import { Navigate, useNavigate } from "react-router-dom";

import OrderSummary from "../checkout/OrderSummary";
import CheckoutForm from "../checkout/CheckoutForm";

import MainLayout from "../layout/MainLayout";

import { useAppSelector } from "../store/hooks";

import type { CheckoutFormData } from "../schemas/checkout.schema";

import { createTransaction } from "../services/transaction.service";

import { processPayment } from "../services/payment.service";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const product = useAppSelector((state) => state.checkout.selectedProduct);

  if (!product) {
    return <Navigate to="/" replace />;
  }

  async function handleCheckout(data: CheckoutFormData) {
    setLoading(true);

    try {
      const transaction = await createTransaction({
        productId: product.id,

        customer: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
        },

        delivery: {
          address: data.address,
          city: data.city,
          department: "Caldas",
          postalCode: "170001",
        },
      });

      const payment = await processPayment({
        transactionId: transaction.id,

        cardHolder: data.cardHolder,
        cardNumber: data.cardNumber,
        expMonth: data.expMonth,
        expYear: data.expYear,
        cvc: data.cvc,
      });

      if (payment.status === "APPROVED") {
        // Limpiar formulario guardado
        localStorage.removeItem("checkout-form");

        navigate(`/success/${transaction.id}`);
      } else {
        navigate("/failed", {
          state: {
            status: payment.status,
          },
        });
      }
    } catch (error) {
      console.error(error);

      navigate("/failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout>
      <Backdrop
        open={loading}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Box textAlign="center">
          <CircularProgress color="inherit" />

          <Typography mt={2}>Processing payment...</Typography>
        </Box>
      </Backdrop>

      <Typography variant="h4" sx={{ mb: 4 }}>
        Checkout
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
          gap: 4,
        }}
      >
        <OrderSummary product={product} />

        <CheckoutForm onSubmit={handleCheckout} />
      </Box>
    </MainLayout>
  );
}
