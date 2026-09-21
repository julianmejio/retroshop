import { Injectable } from '@nestjs/common';
import { DiscountStrategy } from './discount-strategy.interface';
import { Money } from '../value-objects/money.vo';

/**
 * Discount strategy for Back to the Future saga.
 */
@Injectable()
export class BttfDiscountStrategy implements DiscountStrategy {
  /**
   * Saga names from Back to the Future.
   * Names are normalized to lower case.
   * @private
   */
  private static readonly FILMS: ReadonlySet<string> = new Set([
    'back to the future 1',
    'back to the future 2',
    'back to the future 3',
  ]);

  /**
   * @inheritDoc
   */
  public itemBelongsTo(item: string): boolean {
    return BttfDiscountStrategy.FILMS.has(this.normalizeName(item));
  }

  /**
   * Gets the price applied to films that belong to the discount strategy.
   * For BTTF, the price is fixed to EUR 15 per copy.
   * @return Money value for applying to the film.
   */
  public pricePerUnit(): Money {
    return Money.of(15);
  }

  /**
   * @inheritDoc
   */
  public appliesTo(items: string[]): boolean {
    return this.countDistinctVolumes(items) >= 2;
  }

  /**
   * @inheritDoc
   */
  public rate(items: string[]): number {
    const distinctVolumes = this.countDistinctVolumes(items);
    // 20% for 3 distinct copies
    if (distinctVolumes === 3) return 0.2;
    // 10% for 2 distinct copies
    if (distinctVolumes === 2) return 0.1;
    // 0% otherwise.
    return 0;
  }

  /**
   * Count the number of DIFFERENT copies related to the discount.
   * @param items List of items in the cart
   * @return Number of DIFFERENT copies present in the cart.
   * @private
   */
  private countDistinctVolumes(items: string[]): number {
    return new Set(
      items.filter((item) =>
        BttfDiscountStrategy.FILMS.has(this.normalizeName(item)),
      ),
    ).size;
  }

  /**
   * Apply string transformation trim and lower case for name normalization
   * @param item Name to normalize
   * @return the same string content, white-space trimmed and lower case.
   * @private
   */
  private normalizeName(item: string): string {
    return item.trim().toLowerCase();
  }
}
