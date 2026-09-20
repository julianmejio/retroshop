import { DomainException } from '../../../shared/exceptions/domain.exception';

export class EmptyCartException extends DomainException {
  constructor() {
    super('Cart cannot be empty');
  }
}
