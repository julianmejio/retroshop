import { BttfDiscountStrategy } from './discount/bttf-discount.strategy';
import { Cart } from './cart.entity';
import { EmptyCartException } from './exceptions/EmptyCartException';

describe('Cart', () => {
  const strategies = [new BttfDiscountStrategy()];
  describe('fromTextInput', () => {
    it('should parse multi-line cart', () => {
      expect(
        Cart.fromTextInput('Movie 1\nMovie 2\nMovie 3', strategies).itemsInCart,
      ).toEqual(expect.arrayContaining(['Movie 1', 'Movie 2', 'Movie 3']));
    });
    it.each([[''], [' '], ['\n'], ['\n\n'], [' \n \n ']])(
      'should throw EmptyCartException if empty input is passed',
      (input) => {
        expect(() => Cart.fromTextInput(input, strategies)).toThrow(
          EmptyCartException,
        );
      },
    );
    it('should trim white spaces in names', () => {
      expect(
        Cart.fromTextInput(' Movie 1\nMovie 2 \n Movie 3 ', strategies)
          .itemsInCart,
      ).toEqual(expect.arrayContaining(['Movie 1', 'Movie 2', 'Movie 3']));
    });
    it('should ignore white lines', () => {
      const cart = Cart.fromTextInput(
        'Movie 1\n\nMovie 2\n \nMovie 3',
        strategies,
      );
      expect(cart.itemsInCart).toHaveLength(3);
      expect(cart.itemsInCart).toEqual(
        expect.arrayContaining(['Movie 1', 'Movie 2', 'Movie 3']),
      );
    });
  });

  describe('calculate', () => {
    it.each([
      {
        example: '#1 Three different BTTF films',
        input:
          'Back to the Future 1\nBack to the Future 2\nBack to the Future 3',
        output: 36,
      },
      {
        example: '#2 Three different BTTF films',
        input: 'Back to the Future 1\nBack to the Future 3',
        output: 27,
      },
      {
        example: '#3 Only one BTTF film',
        input: 'Back to the Future 1',
        output: 15,
      },
      {
        example: '#4 4 BTTF films, which 3 are different',
        input:
          'Back to the Future 1\nBack to the Future 2\nBack to the Future 3\nBack to the Future 2',
        output: 48,
      },
      {
        example: '#5 Three different BTTF films and one out of saga',
        input:
          'Back to the Future 1\nBack to the Future 2\nBack to the Future 3\nLa chèvre',
        output: 56,
      },
    ])(`should pass for BTTF example: $example`, ({ input, output }) => {
      expect(Cart.fromTextInput(input, strategies).calculate().value).toBe(
        output,
      );
    });
  });
});
