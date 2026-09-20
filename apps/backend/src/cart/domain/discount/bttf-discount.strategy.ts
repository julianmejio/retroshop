import { Injectable } from '@nestjs/common';
import { DiscountStrategy } from './discount-strategy.interface';

@Injectable()
export class BttfDiscountStrategy implements DiscountStrategy {
  private static readonly FILMS: ReadonlySet<string> = new Set([
    'Back to the Future 1',
    'Back to the Future 2',
    'Back to the Future 3',
  ]);

  private static readonly PRICE_PER_UNIT = 15;

  public appliesTo(item: string): boolean {
    return BttfDiscountStrategy.FILMS.has(item);
  }

  public applies(items: string[]): boolean {
    return this.countDifferentVolumes(items) >= 2;
  }

  public rate(items: string[]): number {
    const differentVolumes = this.countDifferentVolumes(items);
    if (differentVolumes === 3) return 0.2;
    if (differentVolumes === 2) return 0.1;
    return 0;
  }

  private countDifferentVolumes(items: string[]): number {
    return new Set(items.filter((item) => BttfDiscountStrategy.FILMS.has(item)))
      .size;
  }
}
