import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import CheckoutForm from "../checkout/CheckoutForm";

describe("CheckoutForm", () => {
  it("renders all form fields", () => {
    render(
      <CheckoutForm
        onSubmit={vi.fn()}
      />,
    );

    expect(
      screen.getByLabelText(/Full Name/i),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Email/i),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Address/i),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/City/i),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Phone/i),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Card Holder/i),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Card Number/i),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/MM/i),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/YY/i),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/CVC/i),
    ).toBeInTheDocument();
  });
});