import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import MainLayout from "../layout/MainLayout";

import { getTransactionById } from "../services/transaction.service";
import type { TransactionDetail } from "../types/transaction-detail";

import { useAppDispatch } from "../store/hooks";
import { clearCheckout } from "../store/slices/checkoutSlice";

export default function SuccessPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [transaction, setTransaction] =
    useState<TransactionDetail | null>(null);

  const [loading, setLoading] = useState(true);

  // Limpia el formulario al entrar al Success
  useEffect(() => {
    localStorage.removeItem("checkout-form");
  }, []);

  useEffect(() => {
    if (id) {
      loadTransaction();
    }
  }, [id]);

  async function loadTransaction() {
    try {
      const response = await getTransactionById(id!);

      setTransaction(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleContinueShopping() {
    localStorage.removeItem("selected-product");

    dispatch(clearCheckout());

    navigate("/");
  }

  if (loading) {
    return (
      <MainLayout>
        <Box
          display="flex"
          justifyContent="center"
          mt={10}
        >
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  if (!transaction) {
    return <Navigate to="/" replace />;
  }

  return (
    <MainLayout>
      <Box
        sx={{
          minHeight: "calc(100vh - 120px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          py: 4,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 760,
            borderRadius: 4,
            boxShadow: 6,
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Stack
              spacing={2}
              alignItems="center"
            >
              <Box
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  bgcolor: "#E8F5E9",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckCircleIcon
                  sx={{
                    color: "#2E7D32",
                    fontSize: 55,
                  }}
                />
              </Box>

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                Payment Successful
              </Typography>

              <Typography
                color="text.secondary"
                align="center"
              >
                Thank you <strong>{transaction.customer.fullName}</strong>
                <br />
                Your payment has been approved successfully.
              </Typography>

              <Chip
                color="success"
                label={transaction.status}
              />
            </Stack>

            <Divider sx={{ my: 4 }} />

            <Paper
              variant="outlined"
              sx={{
                p: 3,
                borderRadius: 3,
              }}
            >
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={3}
                alignItems="center"
              >
                <Box
                  component="img"
                  src={transaction.product.image}
                  alt={transaction.product.name}
                  sx={{
                    width: {
                      xs: 140,
                      sm: 120,
                    },
                    height: {
                      xs: 140,
                      sm: 120,
                    },
                    borderRadius: 3,
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />

                <Box flex={1}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    {transaction.product.name}
                  </Typography>

                  <Typography color="text.secondary">
                    {transaction.product.description}
                  </Typography>

                  <Typography
                    mt={2}
                    variant="body2"
                    color="text.secondary"
                  >
                    Reference
                  </Typography>

                  <Typography fontWeight="bold">
                    {transaction.reference}
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            <Divider sx={{ my: 4 }} />

            <Paper
              variant="outlined"
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "#fafafa",
              }}
            >
              <Typography
                variant="h6"
                mb={2}
              >
                Order Summary
              </Typography>

              <Stack spacing={1.5}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography>Product</Typography>

                  <Typography>
                    {Number(transaction.productAmount).toLocaleString(
                      "es-CO",
                      {
                        style: "currency",
                        currency: "COP",
                      },
                    )}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography>Shipping</Typography>

                  <Typography>
                    {Number(transaction.deliveryFee).toLocaleString(
                      "es-CO",
                      {
                        style: "currency",
                        currency: "COP",
                      },
                    )}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography>Platform Fee</Typography>

                  <Typography>
                    {Number(transaction.baseFee).toLocaleString(
                      "es-CO",
                      {
                        style: "currency",
                        currency: "COP",
                      },
                    )}
                  </Typography>
                </Stack>

                <Divider />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    Total
                  </Typography>

                  <Typography
                    variant="h6"
                    color="primary"
                    fontWeight="bold"
                  >
                    {Number(transaction.total).toLocaleString(
                      "es-CO",
                      {
                        style: "currency",
                        currency: "COP",
                      },
                    )}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>

            <Divider sx={{ my: 4 }} />

            <Paper
              variant="outlined"
              sx={{
                p: 3,
                borderRadius: 3,
              }}
            >
              <Typography
                variant="h6"
                mb={2}
              >
                Shipping Address
              </Typography>

              <Typography>
                {transaction.delivery.address}
              </Typography>

              <Typography color="text.secondary">
                {transaction.delivery.city},{" "}
                {transaction.delivery.department}
              </Typography>
            </Paper>

            <Typography
              mt={4}
              color="text.secondary"
              align="center"
              variant="body2"
            >
              Purchased on{" "}
              {new Date(transaction.createdAt).toLocaleString("es-CO")}
            </Typography>

            <Stack
              mt={4}
            >
              <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  );
}