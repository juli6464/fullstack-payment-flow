import { describe, expect, it, vi } from "vitest";

import { api } from "../api/axios";
import {
  createTransaction,
  getTransactionById,
} from "./transaction.service";

vi.mock("../api/axios", () => ({
  api: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe("transaction.service", () => {
  it("should create a transaction", async () => {
    const request = {
      productId: "1",
      customer: {
        fullName: "John Doe",
        email: "john@test.com",
        phone: "3001234567",
      },
      delivery: {
        address: "Street 123",
        city: "Manizales",
        department: "Caldas",
        postalCode: "170001",
      },
    };

    const response = {
      id: "trx-1",
      reference: "REF-001",
      status: "PENDING",
      total: "50000",
    };

    vi.mocked(api.post).mockResolvedValue({
      data: response,
    });

    const result = await createTransaction(request);

    expect(api.post).toHaveBeenCalledWith(
      "/transactions",
      request,
    );

    expect(result).toEqual(response);
  });

  it("should get transaction by id", async () => {
    const response = {
      id: "trx-1",
      reference: "REF-001",
      status: "APPROVED",
      total: "50000",
      product: {
        id: "1",
        name: "T-Shirt",
      },
      customer: {
        fullName: "John Doe",
      },
      delivery: {
        city: "Manizales",
      },
    };

    vi.mocked(api.get).mockResolvedValue({
      data: response,
    });

    const result = await getTransactionById("trx-1");

    expect(api.get).toHaveBeenCalledWith(
      "/transactions/trx-1",
    );

    expect(result).toEqual(response);
  });
});