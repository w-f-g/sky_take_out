import { IAddCategoryDTO, ICategoryPageQueryDTO, IEditCategoryDTO } from '@sky_take_out/types'

/** 修改分类 DTO */
export class EditCategoryDTO implements IEditCategoryDTO {
  id: number
  name: string
  sort: number
  type: number
}

/** 分类分页查询 DTO */
export class CategoryPageQueryDTO implements ICategoryPageQueryDTO {
  name?: string
  type: '1' | '2'
  page: string
  pageSize: string
}

/** 新增分类 DTO */
export class AddCategoryDTO implements IAddCategoryDTO {
  id?: number
  name: string
  sort: number
  type: number
}