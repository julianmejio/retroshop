import { BttfDiscountStrategy } from './bttf-discount.strategy';

describe('BttfDiscountStrategy', () => {
  describe('itemBelongsTo', () => {
    it.each([
      ['Back to the Future 1'],
      ['Back to the Future 2'],
      ['Back to the Future 3'],
      ['back to the future 1'],
      ['back to the future 2'],
      ['back to the future 3'],
      ['BACK TO THE FUTURE 1'],
      ['BACK TO THE FUTURE 2'],
      ['BACK TO THE FUTURE 3'],
      [' BACK TO THE FUTURE 1'],
      ['BACK TO THE FUTURE 1 '],
      [' BACK TO THE FUTURE 1 '],
    ])('should return true', (item) => {
      expect(new BttfDiscountStrategy().itemBelongsTo(item)).toBe(true);
    });
  });
  describe('pricePerUnit', () => {
    it('should be EUR 15', () => {
      const pricePerUnit = new BttfDiscountStrategy().pricePerUnit();
      expect(pricePerUnit.value).toBe(15);
      expect(pricePerUnit.currencyCode).toBe('EUR');
    });
  });
  describe('appliesTo', () => {
    it.each([
      [
        [
          'Back to the Future 1',
          'Back to the Future 2',
          'Back to the Future 3',
        ],
      ],
      [['Back to the Future 1', 'Back to the Future 3']],
      [
        [
          'Back to the Future 1',
          'Back to the Future 2',
          'Back to the Future 3',
          'Back to the Future 2',
        ],
      ],
      [
        [
          'Back to the Future 1',
          'Back to the Future 2',
          'Back to the Future 3',
          'La chèvre',
        ],
      ],
    ])(
      'should return true in carts including at least two different BTTF films',
      (items) => {
        expect(new BttfDiscountStrategy().appliesTo(items)).toBe(true);
      },
    );
    it.each([
      [['Back to the Future 1']],
      [['Back to the Future 1', 'Back to the Future 1']],
      [['Back to the Future 1', 'Back to the Future 1', 'La chèvre']],
      [['Back to the Future 1', 'Back to the Future 1', 'La chèvre']],
      [['The Lord of the Rings 1', 'Back to the Future 1', 'La chèvre']],
    ])('should return false when only 1 or no BTTF films in cart', (items) => {
      expect(new BttfDiscountStrategy().appliesTo(items)).toBe(false);
    });
  });
  describe('rate', () => {
    it('should return 0 (0%) For one BTTF film in cart', () => {
      expect(new BttfDiscountStrategy().rate(['Back to the Future 1'])).toBe(0);
    });
    it('should return 0.1 (10%) For two different BTTF films in cart', () => {
      expect(
        new BttfDiscountStrategy().rate([
          'Back to the Future 1',
          'Back to the Future 2',
        ]),
      ).toBe(0.1);
    });
    it('should return 0.2 (20%) For three different BTTF films in cart', () => {
      expect(
        new BttfDiscountStrategy().rate([
          'Back to the Future 1',
          'Back to the Future 2',
          'Back to the Future 3',
        ]),
      ).toBe(0.2);
    });
    it('should return 0.2 (20%) For more than three BTTF films in cart, which at least 3 are different', () => {
      expect(
        new BttfDiscountStrategy().rate([
          'Back to the Future 1',
          'Back to the Future 2',
          'Back to the Future 3',
          'Back to the Future 2',
        ]),
      ).toBe(0.2);
    });
  });
});
