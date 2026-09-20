import { Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DomainExceptionFilter } from './shared/exceptions/domain-exception.filter';

@Module({
  imports: [],
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
