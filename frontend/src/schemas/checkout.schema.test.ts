import { describe, expect, it } from "vitest";

import { checkoutSchema } from "./checkout.schema";

const validData = {
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
};

describe("checkoutSchema", () => {
  it("accepts valid data", () => {
    expect(() =>
      checkoutSchema.parse(validData),
    ).not.toThrow();
  });

  it("rejects invalid email", () => {
    expect(() =>
      checkoutSchema.parse({
        ...validData,
        email: "invalid-email",
      }),
    ).toThrow();
  });

  it("rejects short full name", () => {
    expect(() =>
      checkoutSchema.parse({
        ...validData,
        fullName: "Jo",
      }),
    ).toThrow();
  });

  it("rejects numbers in full name", () => {
    expect(() =>
      checkoutSchema.parse({
        ...validData,
        fullName: "John123",
      }),
    ).toThrow();
  });

  it("rejects invalid city", () => {
    expect(() =>
      checkoutSchema.parse({
        ...validData,
        city: "City123",
      }),
    ).toThrow();
  });

  it("rejects invalid phone", () => {
    expect(() =>
      checkoutSchema.parse({
        ...validData,
        phone: "12345",
      }),
    ).toThrow();
  });

  it("rejects invalid card number", () => {
    expect(() =>
      checkoutSchema.parse({
        ...validData,
        cardNumber: "1234",
      }),
    ).toThrow();
  });

  it("rejects invalid month", () => {
    expect(() =>
      checkoutSchema.parse({
        ...validData,
        expMonth: "13",
      }),
    ).toThrow();
  });

  it("rejects invalid year", () => {
    expect(() =>
      checkoutSchema.parse({
        ...validData,
        expYear: "3",
      }),
    ).toThrow();
  });

  it("rejects invalid cvc", () => {
    expect(() =>
      checkoutSchema.parse({
        ...validData,
        cvc: "12",
      }),
    ).toThrow();
  });
});