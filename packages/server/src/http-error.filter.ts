import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import R from './utils/response'
import { MessageConstant } from './utils/constant'

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const http = host.switchToHttp()
    const response = http.getResponse<Response>()
    const exceptionResponse = exception.getResponse() as string | Record<'message', string[]>
    
    let message = exception.message
    if (typeof exceptionResponse !== 'string') {
      if (Array.isArray(exceptionResponse.message)) {
        message = exceptionResponse.message[0]
      } else {
        message = exception.message
      }
    }

    if (message.includes('Duplicate entry')) {
      const username = message.split(' ')[2]
      message = username + MessageConstant.ALREADY_EXISTS
    }
 
    response.status(HttpStatus.OK).json(R.error(message))
  }
}
