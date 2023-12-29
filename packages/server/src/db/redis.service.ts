import { Provider } from '@nestjs/common'
import { createClient } from 'redis'

export const REDIS_SERVICE_KEY = 'REDIS_CLIENT'

export const RedisService: Provider = {
  provide: REDIS_SERVICE_KEY,
  async useFactory() {
    const client = createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      }
    })
    await client.connect()
    return client
  }
}