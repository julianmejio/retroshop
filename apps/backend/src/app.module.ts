import { Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DomainExceptionFilter } from './shared/exceptions/domain-exception.filter';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [CartModule],
  controllers: [],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
  ],
})
export class AppModule {}
