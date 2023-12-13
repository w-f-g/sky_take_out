import { Module } from '@nestjs/common'
import { EmployeeModule } from './employee/employee.module'
import { DBModule } from './db/db.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { resolve } from 'path'
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        resolve(process.cwd(), '.env.development'),
        resolve(process.cwd(), '.env.production'),
      ],
    }),
    EmployeeModule,
    DBModule,
    JwtModule.register({
      global: true,
      secret: '福生无量天尊',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    CategoryModule,
  ],
})
export class AppModule {}
