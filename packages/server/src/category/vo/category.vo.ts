import { ApiProperty } from '@nestjs/swagger'
import { ICategoryVO, IPageResult } from '@sky_take_out/types'

export class CategoryVO implements ICategoryVO {
  @ApiProperty()
  createTime: string
  @ApiProperty()
  updateTime: string
  @ApiProperty()
  createUser: number
  @ApiProperty()
  updateUser: number
  @ApiProperty()
  id: number
  @ApiProperty()
  name: string
  @ApiProperty()
  sort: number
  @ApiProperty()
  status: number
  @ApiProperty()
  type: number
}

export class CategoryPageVO implements IPageResult<ICategoryVO> {
  @ApiProperty({ type: [CategoryVO] })
  records: ICategoryVO[]

  @ApiProperty()
  total: number
}