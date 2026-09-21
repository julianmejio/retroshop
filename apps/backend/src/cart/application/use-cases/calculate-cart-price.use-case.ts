import { Inject, Injectable } from '@nestjs/common';
import {
  DISCOUNT_STRATEGIES,
  DiscountStrategy,
} from '../../domain/discount/discount-strategy.interface';
import { Cart } from '../../domain/cart.entity';
import { CartPriceResponse } from '@repo/shared/cart';

/**
 * Use case: calculate the price of the shopping cart.
 */
@Injectable()
export class CalculateCartPriceUseCase {
  /**
   * Calculate price use case
   * @param discountStrategies Discount strategies
   */
  constructor(
    @Inject(DISCOUNT_STRATEGIES)
    private readonly discountStrategies: DiscountStrategy[],
  ) {}

  /**
   * Run the use case.
   * @param cartInput Text input that represents the items of the cart.
   * @return CartPriceResponse returns the currency and the total of the shopping cart.
   */
  execute(cartInput: string): CartPriceResponse {
    const cart = Cart.fromTextInput(cartInput, this.discountStrategies);
    const total = cart.calculate();
    return {
      total: total.value,
      currency: total.currencyCode,
    };
  }
}
