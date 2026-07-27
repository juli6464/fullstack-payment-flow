import { describe, expect, it } from "vitest";

import checkoutReducer, {
  selectProduct,
  clearCheckout,
  restoreCheckout,
} from "./checkoutSlice";

describe("checkoutSlice", () => {
  const product = {
    id: "1",
    name: "T-Shirt",
    description: "Classic cotton t-shirt",
    image: "https://example.com/tshirt.jpg",
    price: "50000",
    stock: 5,
  };

  it("should return the initial state", () => {
    const state = checkoutReducer(undefined, {
      type: "@@INIT",
    });

    expect(state).toEqual({
      selectedProduct: null,
    });
  });

  it("should select a product", () => {
    const state = checkoutReducer(
      undefined,
      selectProduct(product as any),
    );

    expect(state.selectedProduct).toEqual(product);
  });

  it("should clear the selected product", () => {
    const state = checkoutReducer(
      {
        selectedProduct: product as any,
      },
      clearCheckout(),
    );

    expect(state.selectedProduct).toBeNull();
  });

  it("should restore the selected product", () => {
    const state = checkoutReducer(
      undefined,
      restoreCheckout(product as any),
    );

    expect(state.selectedProduct).toEqual(product);
  });
});