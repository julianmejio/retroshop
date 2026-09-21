import { CalculatePricePayload, CartPriceResponse } from "@repo/shared/cart";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  cart: {
    calculate: async (
      input: string,
      signal: AbortSignal,
    ): Promise<CartPriceResponse> => {
      const response = await fetch(`${API_URL}/cart/calculate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
        signal,
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          Array.isArray(error.message)
            ? error.message.join(", ")
            : (error.message ?? "Unexpected error"),
        );
      }
      return response.json();
    },
  },
};
