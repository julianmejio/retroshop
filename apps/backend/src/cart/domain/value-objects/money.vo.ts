export class Money {
  private constructor(
    private readonly amount: number,
    private readonly currency: string = 'EUR',
  ) {
    if (amount < 0) {
      throw new Error('Amount cannot be negative');
    }
  }

  public static of(amount: number, currency: string = 'EUR'): Money {
    return new Money(amount, currency);
  }

  public get value(): number {
    return this.amount;
  }

  public get currencyCode(): string {
    return this.currency;
  }
}
