import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";

import SuccessPage from "../pages/SuccessPage";

import { getTransactionById } from "../services/transaction.service";
import { useAppDispatch } from "../store/hooks";
import { clearCheckout } from "../store/slices/checkoutSlice";

const navigate = vi.fn();
const dispatch = vi.fn();

vi.mock("../services/transaction.service", () => ({
  getTransactionById: vi.fn(),
}));

vi.mock("../store/hooks", () => ({
  useAppDispatch: () => dispatch,
}));

vi.mock("../layout/MainLayout", () => ({
  default: ({ children }: any) => <>{children}</>,
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => navigate,
    useParams: () => ({ id: "trx-1" }),
    Navigate: () => <div>Redirect Home</div>,
  };
});

describe("SuccessPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const transaction = {
    id: "trx-1",
    reference: "REF001",
    status: "APPROVED",

    product: {
      id: "1",
      name: "T-Shirt",
      description: "Classic",
      image: "",
    },

    customer: {
      fullName: "John Doe",
    },

    delivery: {
      address: "Street 123",
      city: "Manizales",
      department: "Caldas",
    },

    productAmount: "50000",
    deliveryFee: "10000",
    baseFee: "2000",
    total: "62000",
    createdAt: new Date().toISOString(),
  };

  it("renders transaction information", async () => {
    vi.mocked(getTransactionById).mockResolvedValue(transaction as any);

    render(<SuccessPage />);

    expect(
      screen.getByRole("progressbar"),
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(
        screen.getByText(/Payment Successful/i),
      ).toBeInTheDocument(),
    );

    expect(
      screen.getByText("John Doe"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("REF001"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Continue Shopping"),
    ).toBeInTheDocument();
  });

  it("continues shopping", async () => {
    vi.mocked(getTransactionById).mockResolvedValue(transaction as any);

    localStorage.setItem("selected-product", "test");

    render(<SuccessPage />);

    await screen.findByText("Continue Shopping");

    await userEvent.click(
      screen.getByText("Continue Shopping"),
    );

    expect(dispatch).toHaveBeenCalledWith(
      clearCheckout(),
    );

    expect(
      localStorage.getItem("selected-product"),
    ).toBeNull();

    expect(navigate).toHaveBeenCalledWith("/");
  });
});