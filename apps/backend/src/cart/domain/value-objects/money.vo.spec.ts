import { Money } from './money.vo';

describe('Money', () => {
  describe('of', () => {
    it('should default to EUR currency code', () => {
      const money = Money.of(15);
      expect(money.currencyCode).toBe('EUR');
    });
    it('should create a new value', () => {
      const money = Money.of(10);
      expect(money.value).toBe(10);
    });
    it('should round down cents', () => {
      expect(Money.of(19.9999999999).value).toBe(19.99);
    });
    it('should create a money value with a different currency code', () => {
      const money = Money.of(10, 'USD');
      expect(money.value).toBe(10);
      expect(money.currencyCode).toBe('USD');
    });
    it('should create a 0-value money', () => {
      const money = Money.of(0);
      expect(money.value).toBe(0);
    });
    it('should fail if negative amount is given', () => {
      expect(() => Money.of(-1)).toThrow('Amount cannot be negative');
    });
  });
  describe('add', () => {
    it('should add two amounts of same currency code', () => {
      const money1 = Money.of(15);
      const money2 = Money.of(20);
      expect(money1.add(money2).value).toBe(35);
    });
    it('should fail if money objects are from different currency', () => {
      const money1 = Money.of(15, 'EUR');
      const money2 = Money.of(20, 'USD');
      expect(() => money1.add(money2)).toThrow(
        'Cannot add money with different currency',
      );
    });
  });
  describe('multiply', () => {
    it('should multiply an amount by a factor', () => {
      expect(Money.of(15).multiply(2).value).toBe(30);
    });
    it('should work as discount (percentage) processor', () => {
      expect(Money.of(45).multiply(1 - 0.2).value).toBe(36);
    });
    it('should handle correctly periodic factor multiplication', () => {
      expect(Money.of(7).multiply(0.899999).value).toBe(6.29);
    });
    it('should fail if factor is negative', () => {
      expect(() => Money.of(10).multiply(-1)).toThrow(
        'Multiplication factor cannot be negative',
      );
    });
  });
  describe('toString', () => {
    it('should return ISO 4217 string representation of the money', () => {
      expect(Money.of(15).toString()).toBe('EUR 15');
    });
  });
});
