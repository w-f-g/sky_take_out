import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseEnumPipe, ParseIntPipe, Post, Put, Query } from '@nestjs/common'
import { SetmealService } from './setmeal.service'
import R from 'src/utils/response'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { SetmealVO } from './vo/setmeal.vo'
import { SetmealAddDTO, SetmealDTO, SetmealPageQueryDTO } from './dto/setmeal.dto'
import { StatusConstant } from 'src/utils/constant'

@ApiBearerAuth('bearer')
@ApiTags('套餐相关接口')
@Controller('/admin/setmeal')
export class SetmealController {
  constructor(private readonly setmealService: SetmealService) {}

  @ApiOperation({ summary: '修改套餐' })
  @Put()
  async editSetmeal(@Body() data: SetmealDTO) {
    await this.setmealService.editSetmeal(data)
    return R.success(null)
  }

  @ApiOperation({ summary: '分页查询' })
  @Get('/page')
  async getSetmealPageQuery(@Query() query: SetmealPageQueryDTO) {
    const res = await this.setmealService.getSetmealPageQuery(query)
    return R.success(res)
  }

  @ApiOperation({ summary: '套餐起售、停售' })
  @Post('/status/:status')
  async changeSetmealStatus(
    @Query('id', new ParseIntPipe()) id: number,
    @Param(
      'status',
      new ParseEnumPipe(StatusConstant),
    )
    status: StatusConstant
  ) {
    await this.setmealService.changeSetmealStatus(id, status)
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
