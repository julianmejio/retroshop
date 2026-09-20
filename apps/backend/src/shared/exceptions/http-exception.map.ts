import { DomainExceptionConstructor } from './domain.exception';
import { HttpStatus } from '@nestjs/common';
import { EmptyCartException } from '../../cart/domain/exceptions/EmptyCartException';

export const HttpExceptionMap = new Map<DomainExceptionConstructor, HttpStatus>(
  [[EmptyCartException, HttpStatus.BAD_REQUEST]],
);
