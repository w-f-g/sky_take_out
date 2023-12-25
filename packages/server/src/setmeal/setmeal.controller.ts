import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Put, Query } from '@nestjs/common'
import { SetmealService } from './setmeal.service'
import R from 'src/utils/response'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { SetmealVO } from './vo/setmeal.vo'
import { SkipAuth } from 'src/auth/skip-auth.decorator'
import { SetmealAddDTO } from './dto/setmeal.dto'

@ApiBearerAuth('bearer')
@ApiTags('套餐相关接口')
@SkipAuth()
@Controller('/admin/setmeal')
export class SetmealController {
  constructor(private readonly setmealService: SetmealService) {}

  @ApiOperation({ summary: '修改套餐' })
  @Put()
  async editSetmeal() {
    return R.success(null)
  }

  @ApiOperation({ summary: '分页查询' })
  @Get('/page')
  async getSetmealPageQuery() {
    return R.success(null)
  }

  @ApiOperation({ summary: '套餐起售、停售' })
  @Post('/status/:status')
  async changeSetmealStatus() {
    return R.success(null)
  }

  @ApiOperation({ summary: '批量删除套餐' })
  @Delete()
  async deleteSetmeal(
    @Query(
      'ids',
      new ParseArrayPipe({ items: Number })
    )
    ids: number[]
  ) {
    await this.setmealService.deleteSetmealByIds(ids)
    return R.success(null)
  }

  @ApiOperation({ summary: '新增套餐' })
  @Post()
  async addSetmeal(@Body() data: SetmealAddDTO) {
    await this.setmealService.addSetmeal(data)
    return R.success(null)
  }

  @ApiOkResponse({ type: SetmealVO })
  @ApiOperation({ summary: '根据id查询套餐' })
  @Get('/:id')
  async getSetmealById(@Param('id', new ParseIntPipe()) id: number) {
    const res = await this.setmealService.getSetmealById(id)
    return R.success(res)
  }
}
