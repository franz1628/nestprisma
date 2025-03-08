import { HttpStatus, Injectable } from '@nestjs/common';
import { ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { ResponseDto } from '../dtos/responseDto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>(); // Obtener la solicitud
    return next.handle().pipe(
      map((response) => {
        const { data, message, state } = response ?? {}; // Extraer `data` y `message` si existen
        return new ResponseDto(
          state || 1,
          HttpStatus.OK,
          data || response, // Si no hay `data`, se asume que `response` es la data
          message || 'Operación exitosa', // Si no hay `message`, se usa un genérico
          request.url,
        );
      }),
    );
  }
}
