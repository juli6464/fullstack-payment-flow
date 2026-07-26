import {
  Box,
  Button,
  Paper,
  Typography,
} from '@mui/material';

import ErrorIcon from '@mui/icons-material/Error';

import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

export default function FailedPage() {

  const navigate = useNavigate();

  const location = useLocation();

  const status =
    location.state?.status ?? 'UNKNOWN';

  return (
    <Box
      display="flex"
      justifyContent="center"
      mt={8}
    >
      <Paper
        sx={{
          p: 5,
          maxWidth: 500,
          textAlign: 'center',
        }}
      >
        <ErrorIcon
          color="error"
          sx={{ fontSize: 80 }}
        />

        <Typography
          variant="h4"
          mt={2}
        >
          Payment Failed
        </Typography>

        <Typography mt={2}>
          Status: {status}
        </Typography>

        <Button
          sx={{ mt: 4 }}
          variant="contained"
          onClick={() => navigate('/checkout')}
        >
          Try Again
        </Button>

      </Paper>
    </Box>
  );
}