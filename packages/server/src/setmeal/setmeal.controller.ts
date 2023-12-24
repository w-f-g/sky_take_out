import { Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { SetmealService } from './setmeal.service'
import R from 'src/utils/response'
import { ApiOperation } from '@nestjs/swagger'

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
  async deleteSetmeal() {
    return R.success(null)
  }

  @ApiOperation({ summary: '新增套餐' })
  @Post()
  async addSetmeal() {
    return R.success(null)
  }

  @ApiOperation({ summary: '根据id查询套餐' })
  @Get('/:id')
  async getSetmealById() {
    return R.success(null)
  }
}
