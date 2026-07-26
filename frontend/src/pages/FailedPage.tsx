import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ReplayIcon from "@mui/icons-material/Replay";
import HomeIcon from "@mui/icons-material/Home";

import { useLocation, useNavigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

export default function FailedPage() {
  const navigate = useNavigate();

  const location = useLocation();

  const status = location.state?.status ?? "UNKNOWN";

  return (
    <MainLayout>
      <Box
        sx={{
          minHeight: "calc(100vh - 120px)", // ajusta si tu navbar tiene otra altura
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
            maxWidth: 700,
            borderRadius: 4,
            boxShadow: 6,
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Stack spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  bgcolor: "#FFEBEE",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <HighlightOffIcon
                  sx={{
                    fontSize: 55,
                    color: "#D32F2F",
                  }}
                />
              </Box>

              <Typography variant="h4" fontWeight="bold">
                Payment Failed
              </Typography>

              <Typography color="text.secondary" align="center">
                Unfortunately we couldn't process your payment.
                <br />
                Please verify your payment information and try again.
              </Typography>

              <Chip color="error" label={status} />
            </Stack>

            <Divider sx={{ my: 4 }} />

            <Paper
              variant="outlined"
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "#fafafa",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Possible reasons
              </Typography>

              <Typography color="text.secondary">
                • Invalid card information
              </Typography>

              <Typography color="text.secondary">
                • Insufficient funds
              </Typography>

              <Typography color="text.secondary">
                • Payment declined by the bank
              </Typography>

              <Typography color="text.secondary">
                • Temporary connection problem
              </Typography>
            </Paper>

            <Divider sx={{ my: 4 }} />

            <Typography variant="body2" color="text.secondary" align="center">
              If the problem persists, please contact your bank or try another
              payment method.
            </Typography>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
              mt={4}
            >
              <Button
                fullWidth
                variant="outlined"
                startIcon={<HomeIcon />}
                onClick={() => navigate("/")}
              >
                Back to Store
              </Button>

              <Button
                fullWidth
                variant="contained"
                color="error"
                startIcon={<ReplayIcon />}
                onClick={() => navigate("/checkout")}
              >
                Try Again
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  );
}
