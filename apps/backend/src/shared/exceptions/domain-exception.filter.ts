import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  DomainException,
  DomainExceptionConstructor,
} from './domain.exception';
import { Response, Request } from 'express';
import { ExceptionResponse } from './exception-response.interface';
import { HttpExceptionMap } from './http-exception.map';

@Injectable()
@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: DomainException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const httpStatus = this.getHttpResponseStatus(exception);

    this.logger.warn('Domain exception', {
      statusCode: httpStatus,
      error: exception.name,
      message: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });

    response.status(httpStatus).json({
      error: exception.message,
    } satisfies ExceptionResponse);
  }

  private getHttpResponseStatus(exception: DomainException): HttpStatus {
    const status = HttpExceptionMap.get(
      exception.constructor as DomainExceptionConstructor,
    );

    return status ?? HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
