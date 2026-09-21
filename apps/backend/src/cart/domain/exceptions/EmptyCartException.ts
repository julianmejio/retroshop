import { DomainException } from '../../../shared/exceptions/domain.exception';

/**
 * Thrown when the cart is empty
 */
export class EmptyCartException extends DomainException {
  constructor() {
    super('Cart cannot be empty');
  }
}
