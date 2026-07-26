import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import ProductGrid from '../components/product/ProductGrid';
import MainLayout from '../layout/MainLayout';
import { getProducts } from '../services/product.service';
import type { Product } from '../types/product';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

async function loadProducts() {
  try {
    const response = await getProducts();

    console.log('Response:', response);
    console.log('Is Array:', Array.isArray(response));

    setProducts(response);
  } catch (error) {
    console.error(error);
  }
}

  function handleBuy(product: Product) {
    console.log(product);
  }

  return (
    <MainLayout>
      <Typography
        variant="h4"
        sx={{ mb: 4 }}
      >
        Products
      </Typography>

      <ProductGrid
        products={products}
        onBuy={handleBuy}
      />
    </MainLayout>
  );
}