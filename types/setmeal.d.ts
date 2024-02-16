import { IEntityCommon, IPageQuery } from "./common";

export interface ISetmeal {
  /** 套餐id */
  id: number,
  /** 分类id */
  categoryId: number,
  /** 套餐名称 */
  name: string,
  /** 套餐价格 */
  price: number,
  /** 套餐状态：1位起售 0为停售 */
  status: number,
  /** 套餐描述 */
  description: string,
  /** 套餐图片 */
  image: string,
  /** 套餐包含的菜品 */
  setmealDishes: ISetmealDish[],
}

export interface ISetmealEntity extends Omit<ISetmeal, 'setmealDishes'>, IEntityCommon {}

/**
 * SetmealDish
 */
export interface ISetmealDish {
  /** 套餐和菜品关系id */
  id: number,
  /** 套餐id */
  setmealId: number,
  /** 菜品id */
  dishId: number,
  /** 菜品名称 */
  name: string,
  /** 菜品价格 */
  price: number,
  /** 份数 */
  copies: number,
}

export interface ISetmealDishEntity extends ISetmealDish, IEntityCommon {}

export interface ISetmealDishAdd extends Omit<ISetmealDish, 'id'> {}

export interface ISetmealEditDTO extends Omit<ISetmeal, 'status'> {}

export interface ISetmealAddDTO extends Omit<ISetmeal, 'id' | 'setmealDishes'> {
  setmealDishes: ISetmealDishAdd[],
}

export interface ISetmealVO extends ISetmeal {
  updateTime: string,
}

export interface ISetmealPageQueryDTO extends IPageQuery {
  categoryId?: string,
  name?: string,
  status?: number,
}

export interface ISetmealPageVO extends Omit<ISetmeal, 'setmealDishes'> {
  updateTime: string,
  categoryName: string,
}