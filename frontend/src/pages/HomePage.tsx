import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductGrid from '../components/product/ProductGrid';
import MainLayout from '../layout/MainLayout';
import { getProducts } from '../services/product.service';
import { useAppDispatch } from '../store/hooks';
import { selectProduct } from '../store/slices/checkoutSlice';
import type { Product } from '../types/product';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (error) {
      console.error(error);
    }
  }

  function handleBuy(product: Product) {
    dispatch(selectProduct(product));

    localStorage.setItem(
    "selected-product",
    JSON.stringify(product),
    );

    navigate("/checkout");
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