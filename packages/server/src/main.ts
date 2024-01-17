import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { HttpErrorFilter } from './http-error.filter'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { resolve } from 'path'
import { WsAdapter } from '@nestjs/platform-ws'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalFilters(new HttpErrorFilter())
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    // 禁止传入未定义的字段
    forbidNonWhitelisted: true,
    whitelist: true,
  }))
  
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
  
  app.useStaticAssets(resolve(__dirname, '../public'), {
    prefix: '/public',
  })
  
  app.useWebSocketAdapter(new WsAdapter(app))
  
  await app.listen(process.env.PORT)
}
bootstrap()
