import { CalculatePricePayload } from '@repo/shared/cart';
import { IsNotEmpty, IsString } from 'class-validator';

export class CalculateCartPriceRequestDto extends CalculatePricePayload {
  @IsString()
  @IsNotEmpty()
  declare public readonly input: string;
}
