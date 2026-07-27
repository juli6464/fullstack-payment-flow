import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import OrderSummary from "../checkout/OrderSummary";
import type { Product } from "../types/product";

describe("OrderSummary", () => {
  const product: Product = {
    id: "1",
    name: "T-Shirt",
    description: "Classic cotton t-shirt",
    image: "https://example.com/tshirt.jpg",
    price: "50000",
    stock: 5,
  };

  it("renders product information", () => {
    render(<OrderSummary product={product} />);

    expect(screen.getByText("T-Shirt")).toBeInTheDocument();
    expect(
      screen.getByText("Classic cotton t-shirt"),
    ).toBeInTheDocument();

    expect(
      screen.getByText((content) => content.includes("50.000")),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Stock:\s*5/i),
    ).toBeInTheDocument();
  });

  it("renders product image", () => {
    render(<OrderSummary product={product} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", product.image);
  });
});