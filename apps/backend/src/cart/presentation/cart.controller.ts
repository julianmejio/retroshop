import { Body, Controller, Post } from '@nestjs/common';
import { CalculateCartPriceUseCase } from '../application/use-cases/calculate-cart-price.use-case';
import { CalculateCartPriceRequestDto } from './calculate-cart-price.request.dto';
import { CalculateCartPriceResponseDto } from './calculate-cart-price.response.dto';

@Controller('cart')
export class CartController {
  public constructor(
    private readonly calculateCartPrice: CalculateCartPriceUseCase,
  ) {}

  @Post('/calculate')
  public calculate(
    @Body() body: CalculateCartPriceRequestDto,
  ): CalculateCartPriceResponseDto {
    return this.calculateCartPrice.execute(body.input);
  }
}
