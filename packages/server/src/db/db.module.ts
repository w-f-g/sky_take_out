import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

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
          logging: true,
          entities: [],
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
