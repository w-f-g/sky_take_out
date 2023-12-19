import { IEntityCommon } from './common.d'

export interface IDish {
  id: number
  name: string
  categoryId: number
  categoryName: string
  price: number
  image: string
  description: string
  status: number
  flavors: IDishFlavor[]
}

export interface IDishEntity extends Omit<IDish, 'categoryName' | 'flavors'>, IEntityCommon {}

/**
 * DishFlavor
*/
export interface IDishFlavor {
  id: number
  dishId: number
  name: string
  value: string
}

export interface IDishFlavorEntity extends IDishFlavor, IEntityCommon {}