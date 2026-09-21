import { Module } from '@nestjs/common';
import { CartController } from './presentation/cart.controller';
import { BttfDiscountStrategy } from './domain/discount/bttf-discount.strategy';
import {
  DISCOUNT_STRATEGIES,
  DiscountStrategy,
} from './domain/discount/discount-strategy.interface';
import { CalculateCartPriceUseCase } from './application/use-cases/calculate-cart-price.use-case';

const activeDiscountStrategies = [BttfDiscountStrategy];

@Module({
  controllers: [CartController],
  providers: [
    ...activeDiscountStrategies,
    {
      provide: DISCOUNT_STRATEGIES,
      useFactory: (...strategies: DiscountStrategy[]): DiscountStrategy[] =>
        strategies,
      inject: activeDiscountStrategies,
    },
    CalculateCartPriceUseCase,
  ],
})
export class CartModule {}
