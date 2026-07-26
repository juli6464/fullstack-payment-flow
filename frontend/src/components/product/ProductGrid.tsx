import { Grid } from '@mui/material';

import type { Product } from '../../types/product';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
  onBuy: (product: Product) => void;
}

export default function ProductGrid({
  products,
  onBuy,
}: Props) {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid
          key={product.id}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
        >
          <ProductCard
            product={product}
            onBuy={onBuy}
          />
        </Grid>
      ))}
    </Grid>
  );
}