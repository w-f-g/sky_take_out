import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { DishService } from './dish.service'
import R from 'src/utils/response'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AddDishDTO, DishPageQueryDTO } from './dto/dish.dto'
import { SkipAuth } from 'src/auth/skip-auth.decorator'
import { DishPageResult } from './vo/dish.vo'

@ApiBearerAuth('bearer')
@ApiTags('菜品相关接口')
@Controller('/admin/dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @ApiOperation({ summary: '修改菜品' })
  @Put()
  async editDish() {
    return R.success(null)
  }
  
  @ApiOperation({ summary: '批量删除菜品' })
  @Delete()
  async deleteDishs() {
    return R.success(null)
  }
  
  @ApiOperation({ summary: '新增菜品' })
  @Post()
  async addDish(@Body() data: AddDishDTO) {
    await this.dishService.addDish(data)
    return R.success(null)
  }

  @ApiOperation({ summary: '根据分类id查询菜品' })
  @Get('/list')
  async getDishByCategoryId() {
    return R.success(null)
  }

  @ApiOkResponse({ type: DishPageResult })
  @ApiOperation({ summary: '菜品分页查询' })
  @Get('/page')
  async getDishPageQuery(@Query() query: DishPageQueryDTO): Promise<R<DishPageResult>> {
    const res = await this.dishService.getDishPage(query)
    return R.success(res)
  }
  
  @SkipAuth()
  @ApiOperation({ summary: '根据id查询菜品' })
  @Get('/:id')
  async getDishById() {
    return R.success(null)
  }

  @ApiOperation({ summary: '菜品起售、停售' })
  @Post('/status/:status')
  async changeDishStatus() {
    return R.success(null)
  }
}
