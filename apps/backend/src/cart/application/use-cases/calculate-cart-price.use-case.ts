import { Inject, Injectable } from '@nestjs/common';
import {
  DISCOUNT_STRATEGIES,
  DiscountStrategy,
} from '../../domain/discount/discount-strategy.interface';
import { Cart } from '../../domain/cart.entity';
import { CartPriceResponse } from '@repo/shared/cart';

@Injectable()
export class CalculateCartPriceUseCase {
  constructor(
    @Inject(DISCOUNT_STRATEGIES)
    private readonly discountStrategies: DiscountStrategy[],
  ) {}

  execute(cartInput: string): CartPriceResponse {
    const cart = Cart.fromTextInput(cartInput, this.discountStrategies);
    const { total } = cart.calculate();
    return {
      total: total.value,
      currency: total.currencyCode,
    };
  }
}
