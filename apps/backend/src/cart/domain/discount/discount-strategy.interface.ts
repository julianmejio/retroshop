export interface DiscountStrategy {
  appliesTo(movie: string): boolean;
  applies(movies: string[]): boolean;
  rate(items: string[]): number;
}

export const DISCOUNT_STRATEGIES = Symbol('DISCOUNT_STRATEGIES');
