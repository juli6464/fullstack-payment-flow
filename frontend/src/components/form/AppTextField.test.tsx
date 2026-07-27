import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import AppTextField from "./AppTextField";

const register = {
  name: "fullName",
  ref: vi.fn(),
  onBlur: vi.fn(),
  onChange: vi.fn(),
};

describe("AppTextField", () => {
  it("renders correctly", () => {
    render(<AppTextField label="Full Name" register={register} />);

    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
  });

  it("should allow only letters", () => {
    render(<AppTextField label="Name" variant="letters" register={register} />);

    const input = screen.getByLabelText("Name");

    fireEvent.change(input, {
      target: {
        value: "John123@@",
      },
    });

    expect(register.onChange).toHaveBeenCalled();

    expect((input as HTMLInputElement).value).toBe("John");
  });
  it("should allow only numbers", () => {
    render(<AppTextField label="Age" variant="numbers" register={register} />);

    const input = screen.getByLabelText("Age");

    fireEvent.change(input, {
      target: {
        value: "12abc34",
      },
    });

    expect((input as HTMLInputElement).value).toBe("1234");
  });
  it("should limit phone to 10 digits", () => {
    render(<AppTextField label="Phone" variant="phone" register={register} />);

    const input = screen.getByLabelText("Phone");

    fireEvent.change(input, {
      target: {
        value: "123456789012345",
      },
    });

    expect((input as HTMLInputElement).value).toBe("1234567890");
  });
  it("should limit card to 16 digits", () => {
    render(<AppTextField label="Card" variant="card" register={register} />);

    const input = screen.getByLabelText("Card");

    fireEvent.change(input, {
      target: {
        value: "12345678901234567890",
      },
    });

    expect((input as HTMLInputElement).value).toBe("1234567890123456");
  });
});
