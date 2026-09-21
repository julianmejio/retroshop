/**
 * Money value that supports a currency (ISO 4217) and an amount with two decimals as cents.
 */
export class Money {
  /**
   * Instances a money representation
   * @param amount Amount represented
   * @param currency ISO 4217 currency code. Defaults to EUR
   * @throws {Error} When the amount is not positive
   * @private
   */
  private constructor(
    private readonly amount: number,
    private readonly currency: string = 'EUR',
  ) {
    if (amount < 0) {
      throw new Error('Amount cannot be negative');
    }
  }

  /**
   * Creates a Money representation
   * @param amount Amount represented.
   * @param currency ISO 4217 currency code.
   * @throws {Error} When the amount is not positive.
   */
  public static of(amount: number, currency: string = 'EUR'): Money {
    return new Money(Math.floor(amount * 100) / 100, currency);
  }

  /**
   * Add an amount to the Money instance
   * @param addition Amount to add.
   * @throws {Error} When the currency of the Money and the addition are different.
   */
  public add(addition: Money): Money {
    if (this.currency !== addition.currency) {
      throw new Error('Cannot add money with different currency');
    }
    return Money.of(this.amount + addition.amount, this.currency);
  }

  /**
   * Increases or decreases the amount of the money, by the factor specified.
   * This multiplication is cents-safe, rounding up to two decimal places.
   *
   * @param factor The base amount will be multiplied by the factor.
   * @throws {Error} When factor is negative.
   *
   * @example
   * // Two products of 15 EUR, 10% OFF = 27 EUR
   * const totalWithDiscount10 = Money.of(15 * 2).multiply(1 - 0.1)
   *
   * // Three products of 15 EUR with 20% OFF = 36 EUR
   * const totalWithDiscount20 = Money.of(15 * 3).multiply(1 - 0.2)
   */
  public multiply(factor: number): Money {
    if (factor < 0) {
      throw new Error('Multiplication factor cannot be negative');
    }
    return Money.of(
      Math.floor(this.amount * factor * 100) / 100,
      this.currency,
    );
  }

  /**
   * Return the amount of the money value
   * @return number
   */
  public get value(): number {
    return this.amount;
  }

  /**
   * Return the currency of the money value.
   * @return string
   */
  public get currencyCode(): string {
    return this.currency;
  }

  /**
   * ISO 4217 string representation of the money value.
   */
  public toString(): string {
    return `${this.currency} ${this.amount}`;
  }
}
