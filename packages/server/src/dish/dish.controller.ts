import { Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { DishService } from './dish.service'
import R from 'src/utils/response'

@Controller('/admin/dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Put()
  async editDish() {
    return R.success(null)
  }

  @Delete()
  async deleteDishs() {
    return R.success(null)
  }

  @Post()
  async addDish() {
    return R.success(null)
  }

  @Get('/:id')
  async getDishById() {
    return R.success(null)
  }

  @Get('/list')
  async getDishByCategoryId() {
    return R.success(null)
  }

  @Get('/page')
  async getDishPageQuery() {
    return R.success(null)
  }

  @Post('/status/:status')
  async changeDishStatus() {
    return R.success(null)
  }
}
