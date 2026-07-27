import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import HomePage from "../pages/HomePage";
import { getProducts } from "../services/product.service";
import { useAppDispatch } from "../store/hooks";
import { selectProduct } from "../store/slices/checkoutSlice";

const navigate = vi.fn();
const dispatch = vi.fn();

vi.mock("../services/product.service", () => ({
  getProducts: vi.fn(),
}));

vi.mock("../store/hooks", () => ({
  useAppDispatch: () => dispatch,
}));

vi.mock("../layout/MainLayout", () => ({
  default: ({ children }: any) => <>{children}</>,
}));

vi.mock("../components/product/ProductGrid", () => ({
  default: ({ products, onBuy }: any) => (
    <div>
      {products.map((p: any) => (
        <button
          key={p.id}
          onClick={() => onBuy(p)}
        >
          {p.name}
        </button>
      ))}
    </div>
  ),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

describe("HomePage", () => {
  const products = [
    {
      id: "1",
      name: "T-Shirt",
      description: "Classic",
      image: "",
      price: 50000,
      stock: 5,
    },
  ];

  it("loads products on mount", async () => {
    vi.mocked(getProducts).mockResolvedValue(products);

    render(<HomePage />);

    expect(screen.getByText("Products")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText("T-Shirt")).toBeInTheDocument(),
    );
  });

  it("dispatches product and navigates to checkout", async () => {
    vi.mocked(getProducts).mockResolvedValue(products);

    render(<HomePage />);

    const user = userEvent.setup();

    await user.click(await screen.findByText("T-Shirt"));

    expect(dispatch).toHaveBeenCalledWith(
      selectProduct(products[0]),
    );

    expect(localStorage.getItem("selected-product")).not.toBeNull();

    expect(navigate).toHaveBeenCalledWith("/checkout");
  });
});