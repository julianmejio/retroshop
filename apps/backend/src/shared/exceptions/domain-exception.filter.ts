import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { DomainException } from './domain.exception';
import { Response, Request } from 'express';
import { ExceptionResponse } from './exception-response.interface';

@Injectable()
@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: DomainException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    this.logger.warn('Domain exception', {
      statusCode: HttpStatus.BAD_REQUEST,
      error: exception.name,
      message: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });

    response.status(HttpStatus.BAD_REQUEST).json({
      error: exception.message,
    } satisfies ExceptionResponse);
  }
}
