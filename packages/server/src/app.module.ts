import { DBModule } from './db/db.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { resolve } from 'path'
import { ClsModule } from 'nestjs-cls'
import { Module } from '@nestjs/common'
import { CommonModule } from './common/common.module'
import { AdminModule } from './admin/admin.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        resolve(process.cwd(), '.env.development'),
        resolve(process.cwd(), '.env.production'),
      ],
    }),
    JwtModule.register({
      global: true,
      secret: '福生无量天尊',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    DBModule,
    CommonModule,
    AdminModule,
    UserModule,
  ],
})
export class AppModule {}
