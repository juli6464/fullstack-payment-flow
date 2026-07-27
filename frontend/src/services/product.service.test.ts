import { describe, expect, it, vi } from "vitest";

import { api } from "../api/axios";
import { getProducts } from "./product.service";

vi.mock("../api/axios", () => ({
  api: {
    get: vi.fn(),
  },
}));

describe("product.service", () => {
  it("should fetch products", async () => {
    const products = [
      {
        id: "1",
        name: "T-Shirt",
        description: "Classic cotton t-shirt",
        image: "https://example.com/tshirt.jpg",
        price: "50000",
        stock: 5,
      },
    ];

    vi.mocked(api.get).mockResolvedValue({
      data: products,
    });

    const result = await getProducts();

    expect(api.get).toHaveBeenCalledWith("/products");

    expect(result).toEqual(products);
  });
});