import {
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { Product } from '../../types/product';

interface CheckoutState {
  selectedProduct: Product | null;
}

const initialState: CheckoutState = {
  selectedProduct: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',

  initialState,

  reducers: {
    selectProduct(state, action: PayloadAction<Product>) {
      state.selectedProduct = action.payload;
    },

    clearCheckout(state) {
      state.selectedProduct = null;
    },
    restoreCheckout(state, action: PayloadAction<Product>) {
      state.selectedProduct = action.payload;
    },
  },
});

export const {
  selectProduct,
  clearCheckout,
  restoreCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;