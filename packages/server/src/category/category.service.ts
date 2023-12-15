import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { FindManyOptions, Like, Repository } from 'typeorm'
import { AddCategoryDTO, CategoryPageQueryDTO, EditCategoryDTO } from './dto/category.dto'
import { CategoryPageVO, CategoryVO } from './vo/category.vo'
import { ICategoryVO } from '@sky_take_out/types'
import { CategoryType, StatusConstant } from 'src/utils/constant'

@Injectable()
export class CategoryService {
  @InjectRepository(Category)
  private categoryRepository: Repository<Category>

  /** 修改分类 service */
  async editCategoryService(data: EditCategoryDTO, empId: number) {
    const _c = new Category()
    Object.entries(data).forEach(([k, v]) => {
      _c[k] = v
    })
    _c.updateTime = new Date()
    _c.updateUser = empId
    try {
      const res = await this.categoryRepository.update(data.id, _c)
      if (res.affected === 0) {
        throw new Error(`更新失败id: ${data.id} 记录不存在`)
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN)
    }
  }

  /** 分类分页查询 service */
  async categoryPageQueryService(query: CategoryPageQueryDTO): Promise<CategoryPageVO> {
    const _p = +query.page
    const _ps = +query.pageSize
    const limitQuery: FindManyOptions<Category> = {
      take: _ps,
      skip: (_p - 1) * _ps,
      where: {
        type: query.type,
      }
    }
    if (query.name) {
      limitQuery.where['name'] = Like(`%${query.name}%`)
    }
    const [categorys, total] = await this.categoryRepository.findAndCount(limitQuery)
    return {
      records: categorys as unknown as ICategoryVO[],
      total,
    }
  }

  /** 新增分类 service */
  async addCategoryService(data: AddCategoryDTO, empId: number) {
    const _c = new Category()
    Object.entries(data).forEach(([k, v]) => {
      _c[k] = v
    })
    const now = new Date()
    _c.createTime = now
    _c.updateTime = now
    _c.createUser = empId
    _c.updateUser = empId
    _c.status = 0

    try {
      await this.categoryRepository.insert(_c)
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN)
    }
  }

  /**  根据id删除分类service */
  async deleteCategoryServer(id: string) {
    // TODO 关联菜品的分类不能被删除
    try {
      const res = await this.categoryRepository.delete(id)
      if (res.affected === 0) {
        throw new Error(`更新失败id: ${id} 记录不存在`)
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN)
    }
  }

  /** 启用、禁用分类 service */
  async changeCategoryStatusService(id: string, status: StatusConstant, empId: number) {
    try {
      const res = await this.categoryRepository.update(id, {
        status,
        updateTime: new Date(),
        updateUser: empId,
      })
      if (res.affected === 0) {
        throw new Error(`更新失败id: ${id} 记录不存在`)
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN)
    }
  }

  /** 根据类型查询分类 service */
  async getCategoryListByType(type: CategoryType): Promise<CategoryVO[]> {
    const list = await this.categoryRepository.findBy({ type })
    return list as unknown as CategoryVO[]
  }
}
