import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import HomePage from "../pages/HomePage";
import { getProducts } from "../services/product.service";
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
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("../components/product/ProductGrid", () => ({
  default: ({ products, onBuy }: any) => (
    <div>
      {products.map((p: any) => (
        <button key={p.id} onClick={() => onBuy(p)}>
          {p.name}
        </button>
      ))}
    </div>
  ),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom",
  );

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
      price: "50000",
      stock: 5,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("loads products on mount", async () => {
    vi.mocked(getProducts).mockResolvedValue(products as any);

    render(<HomePage />);

    expect(screen.getByText("Products")).toBeInTheDocument();

    expect(await screen.findByText("T-Shirt")).toBeInTheDocument();
  });

  it("dispatches product and navigates to checkout", async () => {
    vi.mocked(getProducts).mockResolvedValue(products as any);

    render(<HomePage />);

    const user = userEvent.setup();

    await user.click(await screen.findByText("T-Shirt"));

    expect(dispatch).toHaveBeenCalledWith(
      selectProduct(products[0] as any),
    );

    expect(localStorage.getItem("selected-product")).not.toBeNull();
    expect(navigate).toHaveBeenCalledWith("/checkout");
  });

  it("logs an error when loading products fails", async () => {
    const errorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    vi.mocked(getProducts).mockRejectedValue(
      new Error("API error"),
    );

    render(<HomePage />);

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalled();
    });

    errorSpy.mockRestore();
  });
});