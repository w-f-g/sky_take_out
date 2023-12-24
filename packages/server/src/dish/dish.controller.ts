import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseEnumPipe, ParseIntPipe, Post, Put, Query } from '@nestjs/common'
import { DishService } from './dish.service'
import R from 'src/utils/response'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AddDishDTO, DishDTO, DishPageQueryDTO } from './dto/dish.dto'
import { DishPageResult, DishVO } from './vo/dish.vo'
import { StatusConstant } from 'src/utils/constant'

@ApiBearerAuth('bearer')
@ApiTags('菜品相关接口')
@Controller('/admin/dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @ApiOperation({ summary: '修改菜品' })
  @Put()
  async editDish(@Body() dish: DishDTO) {
    await this.dishService.editDish(dish)
    return R.success(null)
  }
  
  @ApiOperation({ summary: '批量删除菜品' })
  @Delete()
  async deleteDishs(
    @Query(
      'ids',
      new ParseArrayPipe({
        items: Number,
      })
    )
    ids: number[],
  ) {
    await this.dishService.deleteDishs(ids)
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
  async getDishByCategoryId(@Query('categoryId', new ParseIntPipe()) categoryId: number) {
    const res = await this.dishService.getDishByCategoryId(categoryId)
    return R.success(res)
  }

  @ApiOkResponse({ type: DishPageResult })
  @ApiOperation({ summary: '菜品分页查询' })
  @Get('/page')
  async getDishPageQuery(@Query() query: DishPageQueryDTO): Promise<R<DishPageResult>> {
    const res = await this.dishService.getDishPage(query)
    return R.success(res)
  }
  
  @ApiOkResponse({ type: DishVO })
  @ApiOperation({ summary: '根据id查询菜品' })
  @Get('/:id')
  async getDishById(@Param('id', new ParseIntPipe()) id: number): Promise<R<DishVO>> {
    const res = await this.dishService.getDishById(id)
    return R.success(res)
  }

  @ApiOperation({ summary: '菜品起售、停售' })
  @Post('/status/:status')
  async changeDishStatus(
    @Query('id', new ParseIntPipe()) id: number,
    @Param(
      'status',
      new ParseEnumPipe(StatusConstant)
    )
    status: StatusConstant,
  ) {
    await this.dishService.changeDishStatus(id, status)
    return R.success(null)
  }
}
