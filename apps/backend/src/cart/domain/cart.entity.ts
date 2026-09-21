import { Money } from './value-objects/money.vo';
import { DiscountStrategy } from './discount/discount-strategy.interface';
import { EmptyCartException } from './exceptions/EmptyCartException';

/**
 * Default movie price
 */
const MOVIE_PRICE_DEFAULT = Money.of(20);

/**
 * Represents a shopping cart with discount features.
 */
export class Cart {
  /**
   * Creates a new cart
   * @param items Items on the cart
   * @param discountStrategies Discount strategies
   * @private
   */
  private constructor(
    private readonly items: string[],
    private readonly discountStrategies: DiscountStrategy[],
  ) {}

  /**
   * Create a new Cart from a text input
   * @param input Multi-line text that represents the contents of the shopping cart, one per line.
   * @param discountStrategies Discount strategies to apply over the cart.
   * @return A cart instance with the items and discount strategies.
   * @throws {EmptyCartException} if the input has zero items.
   */
  public static fromTextInput(
    input: string,
    discountStrategies: DiscountStrategy[],
  ): Cart {
    const items = input
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (items.length === 0) {
      throw new EmptyCartException();
    }

    return new Cart(items, discountStrategies);
  }

  /**
   * Calculates the value of the cart
   * @return the Money object containing the total amount and currency.
   */
  public calculate(): Money {
    // Calculate the total that is concerned by discount strategies.
    const strategyTotal = this.discountStrategies.reduce((total, strategy) => {
      // Get the items concerned to the current discount strategy.
      const groupItems = this.itemsFor(strategy);
      // If no items concerned, then 0. Those will be counted at regular price later.
      if (groupItems.length === 0) return total;

      // Get total for items, given the price per unit in the discount strategy.
      const subtotal = strategy.pricePerUnit().multiply(groupItems.length);

      // Then, get the discount rate that applies to the items
      const discount = strategy.appliesTo(groupItems)
        ? strategy.rate(groupItems)
        : // Fallback to 0.
          0;

      // To the total of the items, applies the discount rate and add to the total.
      return total.add(subtotal.multiply(1 - discount));
    }, Money.of(0));

    // Calculate the price of the regular films
    const defaultTotal = MOVIE_PRICE_DEFAULT.multiply(
      this.regularItems().length,
    );

    // And sum up the regular total plus the price of discounted products.
    return strategyTotal.add(defaultTotal);
  }

  /**
   * Gets the items that are within the cart.
   * @return string[] Returns the list of items that are within the cart.
   */
  public get itemsInCart(): string[] {
    return this.items;
  }

  /**
   * Filters out the items that can be processed by a discount strategy.
   * @param strategy Discount strategy for filtering out the concerned items
   * @return string[] Items that can be processed by a specific discount strategy.
   * @private
   */
  private itemsFor(strategy: DiscountStrategy): string[] {
    return this.items.filter((item) => strategy.itemBelongsTo(item));
  }

  /**
   * Gets the items that are not processed by any discount strategy and therefore, regular pricing applies.
   * @return string[] Items that are not processed by any of the discount strategies.
   * @private
   */
  private regularItems(): string[] {
    return this.items.filter(
      (item) => !this.discountStrategies.some((s) => s.itemBelongsTo(item)),
    );
  }
}
