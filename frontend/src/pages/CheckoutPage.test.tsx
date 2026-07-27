import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";

import CheckoutPage from "../pages/CheckoutPage";
import { useAppSelector } from "../store/hooks";
import { createTransaction } from "../services/transaction.service";
import { processPayment } from "../services/payment.service";

const mockNavigate = vi.fn();

vi.mock("../store/hooks", () => ({
  useAppSelector: vi.fn(),
}));

vi.mock("../services/transaction.service", () => ({
  createTransaction: vi.fn(),
}));

vi.mock("../services/payment.service", () => ({
  processPayment: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );

  return {
    ...actual,
    Navigate: () => <div>Redirect Home</div>,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../checkout/OrderSummary", () => ({
  default: () => <div>Order Summary</div>,
}));

vi.mock("../checkout/CheckoutForm", () => ({
  default: ({ onSubmit }: any) => (
    <button
      onClick={() =>
        onSubmit({
          fullName: "John Doe",
          email: "john@test.com",
          address: "Street 123",
          city: "Manizales",
          phone: "3001234567",
          cardHolder: "John Doe",
          cardNumber: "4111111111111111",
          expMonth: "12",
          expYear: "30",
          cvc: "123",
        })
      }
    >
      Checkout Form
    </button>
  ),
}));

vi.mock("../layout/MainLayout", () => ({
  default: ({ children }: any) => <>{children}</>,
}));

describe("CheckoutPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects when there is no selected product", () => {
    vi.mocked(useAppSelector).mockReturnValue(null);

    render(<CheckoutPage />);

    expect(screen.getByText("Redirect Home")).toBeInTheDocument();
  });

  it("renders checkout page when product exists", () => {
    vi.mocked(useAppSelector).mockReturnValue({
      id: "1",
      name: "T-Shirt",
      price: 50000,
      stock: 5,
      image: "",
    } as any);

    render(<CheckoutPage />);

    expect(
      screen.getByRole("heading", { name: "Checkout" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Order Summary")).toBeInTheDocument();

    expect(screen.getByText("Checkout Form")).toBeInTheDocument();
  });

  it("navigates to success when payment is approved", async () => {
    const user = userEvent.setup();

    vi.mocked(useAppSelector).mockReturnValue({
      id: "1",
      name: "T-Shirt",
      price: 50000,
      stock: 5,
      image: "",
    } as any);

    vi.mocked(createTransaction).mockResolvedValue({
      id: "tx-123",
      reference: "REF123",
      status: "PENDING",
      total: "50000",
    });

    vi.mocked(processPayment).mockResolvedValue({
      success: true,
      transactionId: "tx-123",
      status: "APPROVED",
      message: "",
      providerReference: "ABC",
    });

    render(<CheckoutPage />);

    await user.click(screen.getByText("Checkout Form"));

    expect(createTransaction).toHaveBeenCalled();

    expect(processPayment).toHaveBeenCalled();

    expect(mockNavigate).toHaveBeenCalledWith("/success/tx-123");
  });

  it("navigates to failed page when payment is rejected", async () => {
    const user = userEvent.setup();

    vi.mocked(useAppSelector).mockReturnValue({
      id: "1",
      name: "T-Shirt",
      price: 50000,
      stock: 5,
      image: "",
    } as any);

    vi.mocked(createTransaction).mockResolvedValue({
      id: "tx-123",
      reference: "REF123",
      status: "PENDING",
      total: "50000",
    });

    vi.mocked(processPayment).mockResolvedValue({
      success: false,
      transactionId: "tx-123",
      status: "DECLINED",
      message: "",
      providerReference: "",
    });

    render(<CheckoutPage />);

    await user.click(screen.getByText("Checkout Form"));

    expect(mockNavigate).toHaveBeenCalledWith("/failed", {
      state: {
        status: "DECLINED",
      },
    });
  });

  it("navigates to failed page when transaction throws error", async () => {
    const user = userEvent.setup();

    vi.mocked(useAppSelector).mockReturnValue({
      id: "1",
      name: "T-Shirt",
      price: 50000,
      stock: 5,
      image: "",
    } as any);

    vi.mocked(createTransaction).mockRejectedValue(
      new Error("Server error"),
    );

    render(<CheckoutPage />);

    await user.click(screen.getByText("Checkout Form"));

    expect(mockNavigate).toHaveBeenCalledWith("/failed");
  });
});