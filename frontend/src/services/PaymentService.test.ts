import { describe, expect, it, vi, beforeEach } from "vitest";

import { processPayment } from "./payment.service";
import { api } from "../api/axios";

vi.mock("../api/axios", () => ({
  api: {
    post: vi.fn(),
  },
}));

describe("PaymentService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should process payment successfully", async () => {
    const request = {
      transactionId: "tx-1",
      cardHolder: "John Doe",
      cardNumber: "4111111111111111",
      expMonth: "12",
      expYear: "30",
      cvc: "123",
    };

    const response = {
      success: true,
      transactionId: "tx-1",
      status: "APPROVED",
      message: "Payment processed",
      providerReference: "wompi-123",
    };

    vi.mocked(api.post).mockResolvedValue({
      data: response,
    });

    const result = await processPayment(request);

    expect(api.post).toHaveBeenCalledWith(
      "/payments/process",
      request,
    );

    expect(result).toEqual(response);
  });

  it("should propagate api errors", async () => {
    const request = {
      transactionId: "tx-1",
      cardHolder: "John Doe",
      cardNumber: "4111111111111111",
      expMonth: "12",
      expYear: "30",
      cvc: "123",
    };

    vi.mocked(api.post).mockRejectedValue(
      new Error("Server Error"),
    );

    await expect(
      processPayment(request),
    ).rejects.toThrow("Server Error");
  });
});