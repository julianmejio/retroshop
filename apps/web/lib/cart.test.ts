import { describe, it, expect } from "vitest";
import { hasContent, formatCartPrice } from "./cart";

describe("hasContent", () => {
  it("returns true for a plain line", () => {
    expect(hasContent("Movie 1")).toBe(true);
  });

  it("returns true when only some lines have content", () => {
    expect(hasContent("\nMovie 1\n")).toBe(true);
  });

  it("returns false for an empty string", () => {
    expect(hasContent("")).toBe(false);
  });

  it("returns false for whitespace-only lines", () => {
    expect(hasContent("   \n  \n\t")).toBe(false);
  });

  it("returns false for a string of only newlines", () => {
    expect(hasContent("\n\n\n")).toBe(false);
  });
});

describe("formatCartPrice", () => {
  it("replaces french white-space in currency format (\\u202F) with regular spaces", () => {
    const result = formatCartPrice({ total: 9999.99, currency: "EUR" });
    expect(result).not.toContain(" ");
    expect(result).toContain(" ");
  });
});
