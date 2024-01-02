import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from 'src/admin/category/entities/category.entity'
import { Dish, DishFlavor } from 'src/admin/dish/entities/dish.entity'
import { Employee } from 'src/admin/employee/entities/employee.entity'
import { Setmeal, SetmealDish } from 'src/admin/setmeal/entities/setmeal.entity'
import { isDev } from 'src/utils'
import { RedisService } from './redis.service'
import { User } from 'src/user/user/entities/user.entity'

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
          entities: [
            Employee, Category,
            Dish, DishFlavor,
            Setmeal, SetmealDish,
            User,
          ],
          poolSize: 10,
          connectorPackage: 'mysql2',
          extra: {
            authPlugin: 'caching_sha2_password',
          },
        }
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class DBModule {}
