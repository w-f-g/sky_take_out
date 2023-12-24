import { EmployeeModule } from './employee/employee.module'
import { DBModule } from './db/db.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { resolve } from 'path'
import { CategoryModule } from './category/category.module'
import { AuthGuard } from './auth/auth.guard'
import { ClsModule } from 'nestjs-cls'
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { CommonModule } from './common/common.module';
import { DishModule } from './dish/dish.module';
import { SetmealModule } from './setmeal/setmeal.module';

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
      // global: true,
      middleware: {
        mount: true,
      },
    }),
    DBModule,
    EmployeeModule,
    CategoryModule,
    CommonModule,
    DishModule,
    SetmealModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
