import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import FailedPage from "./FailedPage";

const navigate = vi.fn();

vi.mock("../layout/MainLayout", () => ({
  default: ({ children }: any) => <>{children}</>,
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => navigate,
    useLocation: () => ({
      state: {
        status: "DECLINED",
      },
    }),
  };
});

describe("FailedPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders failed payment information", () => {
    render(<FailedPage />);

    expect(
      screen.getByText(/Payment Failed/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText("DECLINED"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Possible reasons/i),
    ).toBeInTheDocument();
  });

  it("navigates back to store", async () => {
    const user = userEvent.setup();

    render(<FailedPage />);

    await user.click(
      screen.getByRole("button", {
        name: /Back to Store/i,
      }),
    );

    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("navigates to checkout", async () => {
    const user = userEvent.setup();

    render(<FailedPage />);

    await user.click(
      screen.getByRole("button", {
        name: /Try Again/i,
      }),
    );

    expect(navigate).toHaveBeenCalledWith("/checkout");
  });
});