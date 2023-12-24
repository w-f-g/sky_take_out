import { IEntityCommon, IPageQuery } from './common.d'

export interface IDish {
  id: number,
  name: string,
  categoryId: number,
  price: number,
  image: string,
  description: string,
  status: number,
  flavors: IDishFlavor[],
}

export interface IAddDish extends Omit<IDish, 'id'> {}

export interface IDishEntity extends Omit<IDish, 'flavors'>, IEntityCommon {}

/**
 * DishFlavor
*/
export interface IDishFlavor {
  id: number,
  dishId: number,
  name: string,
  value: string,
}

export interface IDishFlavorEntity extends IDishFlavor, IEntityCommon {}

export interface IDishPageQueryDTO extends IPageQuery {
    /**
     * 分类id
     */
    categoryId?: string,
    /**
     * 菜品名称
     */
    name?: string,
    /**
     * 分类状态
     */
    status?: 0 | 1,
}

export interface IDishPageVO extends Omit<IDish, 'categoryId' | 'flavors'> {
  categoryName: string,
  updateTime: string,
}

export interface IDishVO extends IDish {
  categoryName: string,
  updateTime: string,
}