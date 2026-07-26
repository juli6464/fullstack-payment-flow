import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import type { Product } from '../types/product';

interface Props {
  product: Product;
}

export default function OrderSummary({
  product,
}: Props) {
  return (
    <Card>

      <CardMedia
        component="img"
        height="260"
        image={product.image}
      />

      <CardContent>

        <Typography variant="h5">
          {product.name}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          {product.description}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Stack spacing={1}>

          <Typography variant="h6">
            {
              Number(product.price).toLocaleString(
                'es-CO',
                {
                  style: 'currency',
                  currency: 'COP',
                },
              )
            }
          </Typography>

          <Typography>
            Stock:
            {' '}
            {product.stock}
          </Typography>

        </Stack>

      </CardContent>

    </Card>
  );
}