import { ApiProperty } from '@nestjs/swagger'
import { IWXLoginDTO } from '@sky_take_out/types'
import { IsNotEmpty, IsString } from 'class-validator'

export class WXLoginDTO implements IWXLoginDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string
}