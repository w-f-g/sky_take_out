import { ApiProperty } from '@nestjs/swagger'
import { IWXLoginVO } from '@sky_take_out/types'

export class WXLoginVO implements IWXLoginVO {
  @ApiProperty({type: String })
  id: string | number
  @ApiProperty()
  openid: string
  @ApiProperty()
  token: string
}