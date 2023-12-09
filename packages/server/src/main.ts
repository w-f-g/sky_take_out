import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpErrorFilter } from './http-error.filter'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new HttpErrorFilter())
  app.useGlobalPipes(new ValidationPipe())
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('苍穹外卖')
    .setDescription('苍穹外卖接口文档')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      name: 'bearer',
      description: '基于 jwt 的认证',
    })
    .build()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('doc', app, swaggerDocument)
  
  await app.listen(process.env.PORT)
}
bootstrap()
