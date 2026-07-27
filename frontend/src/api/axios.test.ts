import { describe, expect, it } from "vitest";

import { api } from "./axios";

describe("Axios instance", () => {
  it("should create an axios instance", () => {
    expect(api).toBeDefined();
  });

  it("should use the configured baseURL", () => {
    expect(api.defaults.baseURL).toBe(
      import.meta.env.VITE_API_URL,
    );
  });
});