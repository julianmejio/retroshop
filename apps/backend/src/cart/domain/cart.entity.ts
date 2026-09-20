import { Money } from './value-objects/money.vo';
import { DiscountStrategy } from './discount/discount-strategy.interface';
import { EmptyCartException } from './exceptions/EmptyCartException';

//const MOVIE_PRICE_DEFAULT = Money.of(20);

interface CartCalculation {
  total: Money;
}

export class Cart {
  private constructor(
    private readonly items: string[],
    private readonly discountStrategies: DiscountStrategy[],
  ) {}

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
  public calculate(): CartCalculation {
    // TODO: Calculation of the shopping cart based on discount rules and default pricing.
    return { total: Money.of(0) };
  }
}
