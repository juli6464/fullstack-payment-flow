import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import CheckoutForm from "./CheckoutForm";

describe("CheckoutForm", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("calls onSubmit with valid data", async () => {
    const user = userEvent.setup();

    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<CheckoutForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/Full Name/i), "John Doe");
    await user.type(screen.getByLabelText(/Email/i), "john@test.com");
    await user.type(screen.getByLabelText(/Address/i), "Street 123");
    await user.type(screen.getByLabelText(/City/i), "Manizales");
    await user.type(screen.getByLabelText(/Phone/i), "3001234567");
    await user.type(screen.getByLabelText(/Card Holder/i), "John Doe");
    await user.type(
      screen.getByLabelText(/Card Number/i),
      "4111111111111111",
    );
    await user.type(screen.getByLabelText(/MM/i), "12");
    await user.type(screen.getByLabelText(/YY/i), "30");
    await user.type(screen.getByLabelText(/CVC/i), "123");

    const button = screen.getByRole("button", {
      name: /Pay Now/i,
    });

    expect(button).toBeEnabled();

    await user.click(button);

    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(onSubmit).toHaveBeenCalledWith({
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
    });
  });

  it("loads saved form from localStorage", () => {
    localStorage.setItem(
      "checkout-form",
      JSON.stringify({
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
      }),
    );

    render(<CheckoutForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/Full Name/i)).toHaveValue("John Doe");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("john@test.com");
    expect(screen.getByLabelText(/Address/i)).toHaveValue("Street 123");
    expect(screen.getByLabelText(/City/i)).toHaveValue("Manizales");
    expect(screen.getByLabelText(/Phone/i)).toHaveValue("3001234567");
    expect(screen.getByLabelText(/Card Holder/i)).toHaveValue("John Doe");
    expect(screen.getByLabelText(/Card Number/i)).toHaveValue("4111111111111111");
    expect(screen.getByLabelText(/MM/i)).toHaveValue("12");
    expect(screen.getByLabelText(/YY/i)).toHaveValue("30");
    expect(screen.getByLabelText(/CVC/i)).toHaveValue("123");
  });
});