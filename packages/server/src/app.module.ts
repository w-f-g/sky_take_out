import { DBModule } from './db/db.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { resolve } from 'path'
import { ClsModule } from 'nestjs-cls'
import { Module } from '@nestjs/common'
import { CommonModule } from './common/common.module'
import { AdminModule } from './admin/admin.module'
import { UserRootModule } from './user/user.module'
import { TaskModule } from './task/task.module'
import { ScheduleModule } from '@nestjs/schedule'
import { WebsocketModule } from './websocket/websocket.module'

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
        expiresIn: '2h',
      },
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    ScheduleModule.forRoot(),
    DBModule,
    CommonModule,
    AdminModule,
    UserRootModule,
    TaskModule,
    WebsocketModule,
  ],
})
export class AppModule {}
