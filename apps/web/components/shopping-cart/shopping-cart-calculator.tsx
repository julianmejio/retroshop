"use client";

import { useState, useEffect, useRef } from "react";
import { CartPriceResponse } from "@repo/shared/cart";
import { api } from "@/lib/api";
import { useDebounce } from "@/hooks/useDebounce";
import { formatCartPrice } from "@/lib/cart";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Utils

/**
 * Check if the input of the shopping cart has valid content.
 * @param text Multi-line text as input.
 */
function hasContent(text: string): boolean {
  return text.split("\n").some((line) => line.trim().length > 0);
}

// Component

export default function ShoppingCartCalculator() {
  const [text, setText] = useState<string>("");
  const [total, setTotal] = useState<CartPriceResponse | null>(null);
  const [calculating, setCalculating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const debouncedText = useDebounce<string>(text);

  useEffect(() => {
    if (!hasContent(debouncedText)) {
      setTotal(null);
      setError(null);
      return;
    }

    // Abort if ongoing call
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setCalculating(true);
    setError(null);

    async function calculate(): Promise<void> {
      try {
        const result = await api.cart.calculate(
          debouncedText,
          controller.signal,
        );
        setTotal(result);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        const message =
          err instanceof Error
            ? err.message
            : "Could not calculate price. Please try again.";
        setError(message);
      } finally {
        setCalculating(false);
      }
    }

    void calculate();

    return () => controller.abort();
  }, [debouncedText]);

  const isEmpty = !hasContent(text);

  return (
    <div className="w-full flex flex-col gap-3 h-full">
      <Label className="text-sm font-semibold" htmlFor="cart">
        Films
      </Label>

      <Textarea
        id="cart"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Écrivez un film par ligne"
        className="flex-1 font-mono border-blue-300 bg-white/10 placeholder-blue-200 focus:ring-white/50"
      />

      <ShoppingCartPriceSummary
        total={total}
        calculating={calculating}
        error={error}
        isEmpty={isEmpty}
      />
    </div>
  );
}

interface PriceSummaryProps {
  total: CartPriceResponse | null;
  calculating: boolean;
  error: string | null;
  isEmpty: boolean;
}

function ShoppingCartPriceSummary({
  total,
  calculating,
  error,
  isEmpty,
}: PriceSummaryProps) {
  // Display strategy
  const displayValue = (() => {
    if (error) return error;
    if (isEmpty) return "—";
    if (total !== null) return formatCartPrice(total);
    return "—";
  })();

  // Color strategy
  const valueColor = (() => {
    if (error) return "text-red-500";
    if (calculating) return "text-gray-300";
    if (isEmpty) return "text-gray-300";
    return "text-gray-900";
  })();

  return (
    <div className="flex items-center justify-between rounded-lg border bg-white/10 px-4 py-3">
      <span className="font-extrabold text-lg">Total</span>
      <span
        className={`overflow-hidden text-base font-semibold tabular-nums transition-colors duration-200 ${valueColor}`}
      >
        {displayValue}
      </span>
    </div>
  );
}
