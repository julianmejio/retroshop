import { CartPriceResponse } from "@repo/shared/cart";

const DEFAULT_LOCALE = "fr-FR";

/**
 * Formats the cart price response with the local specified.
 *
 * This replaces \u202F characters with \u0020 as thousands separator in French locales due to
 * inconsistency in some web fonts.
 *
 * @param total Cart total
 * @param currency Total currency
 * @param locale Locale to render as
 */
export function formatCartPrice(
  { total, currency }: CartPriceResponse,
  locale: string = DEFAULT_LOCALE,
): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency })
    .format(total)
    .replace(/\u202F/g, "\u0020");
}
