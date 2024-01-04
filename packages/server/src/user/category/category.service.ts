import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from 'src/admin/category/entities/category.entity'
import { CategoryVO } from 'src/admin/category/vo/category.vo'
import { CategoryType } from 'src/utils/constant'
import { Repository } from 'typeorm'

@Injectable()
export class CategoryService {
  @InjectRepository(Category)
  private categoryRepository: Repository<Category>
  
  /** C端-查询分类 service */
  async list(type: CategoryType | undefined): Promise<CategoryVO[]> {
    if (type !== undefined && !(type in CategoryType)) {
      throw new HttpException('type 值应为1、2', HttpStatus.FORBIDDEN)
    }
    const list = await this.categoryRepository.findBy({
      type,
    })
    return list as unknown as CategoryVO[]
  }
}
