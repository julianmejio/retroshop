import { CartPriceResponse } from '@repo/shared/cart';

export class CalculateCartPriceResponseDto extends CartPriceResponse {
  declare public readonly total: number;
  declare public readonly currency: string;
}
