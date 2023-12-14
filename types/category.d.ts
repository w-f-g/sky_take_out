import { IPageQuery } from "./common";

/** 分类模块基础类型 */
export interface ICategory {
  id: number,
  name: string,
  sort: number,
  status: number,
  type: number,
}

/** 分类模块 entity */
export interface ICategoryEntity extends ICategory {
  createTime: Date,
  createUser: number,
  updateTime: Date,
  updateUser: number,
}

export interface ICategoryVO extends Omit<ICategoryEntity, 'createTime' | 'updateTime'> {
  createTime: string,
  updateTime: string,
}

/** 修改分类 DTO */
export interface IEditCategoryDTO extends Omit<ICategory, 'status' | 'type'> {
  type: 1 | 2,
}

/** 新增分类 DTO */
export interface IAddCategoryDTO extends Omit<IEditCategoryDTO, 'id'> {
  id?: number,
}

/** 分类分页查询 DTO */
export interface ICategoryPageQueryDTO extends IPageQuery {
  /** 分类名称 */
  name?: string,
  /** 分类类型：1为菜品分类，2为套餐分类 */
  type: 1 | 2,
}

// declare const test: IEditCategoryDTO
