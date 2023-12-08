import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpErrorFilter } from './http-error.filter'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new HttpErrorFilter())
  app.useGlobalPipes(new ValidationPipe())
  
  await app.listen(process.env.PORT)
}
bootstrap()
