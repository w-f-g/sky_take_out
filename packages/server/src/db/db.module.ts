import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from 'src/category/entities/category.entity'
import { Dish, DishFlavor } from 'src/dish/entities/dish.entity'
import { Employee } from 'src/employee/entities/employee.entity'
import { isDev } from 'src/utils'

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'mysql',
          host: process.env.MYSQL_HOST,
          port: +process.env.MYSQL_PORT,
          username: process.env.MYSQL_USER_NAME,
          password: process.env.MYSQL_PASSWORD,
          database: 'sky_take_out',
          synchronize: true,
          logging: !isDev(),
          entities: [Employee, Category, Dish, DishFlavor],
          poolSize: 10,
          connectorPackage: 'mysql2',
          extra: {
            authPlugin: 'caching_sha2_password',
          },
        }
      },
    }),
  ]
})
export class DBModule {}
