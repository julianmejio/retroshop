import { Money } from '../value-objects/money.vo';

/**
 * Represents a discount strategy.
 */
export interface DiscountStrategy {
  /**
   * Checks if the name of a movie belongs to the discount strategy.
   * @param item Name of the film
   * @return True if the film belongs to the discount strategy.
   */
  itemBelongsTo(item: string): boolean;
  /**
   * Gets the price applied to films that belong to the discount strategy.
   * @return Money value for applying to the film.
   */
  pricePerUnit(): Money;
  /**
   * Checks if the discount strategy applies to the list of items.
   * @param items List of film names.
   * @return True if the discount strategy can be applied to the list of films.
   */
  appliesTo(items: string[]): boolean;
  /**
   * Gets the discount rate for the list of items.
   * @param items List of items.
   * @return The discount rate (factor) to apply.
   */
  rate(items: string[]): number;
}

export const DISCOUNT_STRATEGIES = Symbol('DISCOUNT_STRATEGIES');
