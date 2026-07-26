import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';

import type { Product } from '../../types/product';
import { getProductImage } from '../../utils/productImages';

interface Props {
  product: Product;
  onBuy: (product: Product) => void;
}

export default function ProductCard({
  product,
  onBuy,
}: Props) {
  return (
    <Card
      elevation={3}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* <CardMedia
        component="img"
        height="220"
        image={product.image}
        alt={product.name}
      /> */}
      <CardMedia
        component="img"
        image={getProductImage(product.name)}
        alt={product.name}
        height="240"
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          {product.description}
        </Typography>

        {/* <Typography
          variant="h5"
          sx={{ mt: 2 }}
        >
          ${product.price.toLocaleString()}
        </Typography> */}
        <Typography
          variant="h5"
          sx={{ mt: 2 }}
        >
            ${Number(product.price).toLocaleString('es-CO')} COP
        </Typography>

        <Chip
          label={`Stock: ${product.stock}`}
          sx={{ mt: 2 }}
        />
      </CardContent>

      <CardActions>
        <Button
          fullWidth
          variant="contained"
          onClick={() => onBuy(product)}
        >
          Buy Now
        </Button>
      </CardActions>
    </Card>
  );
}