import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import R from './utils/response'

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const http = host.switchToHttp()
    const response = http.getResponse<Response>()
    const statusCode = exception.getStatus()
    const exceptionResponse = exception.getResponse() as string | Record<'message', string[]>
    
    let message = exception.message
    if (typeof exceptionResponse !== 'string') {
      if (Array.isArray(exceptionResponse.message)) {
        message = exceptionResponse.message[0]
      } else {
        message = exception.message
      }
    }
 
    response
      .status(
        statusCode !== HttpStatus.UNAUTHORIZED
          ? HttpStatus.OK
          : statusCode
      )
      .json(new R(statusCode, null, message))
  }
}
