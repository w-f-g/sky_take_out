export interface IShoppingCart {
  amount: number,
  createTime: string,
  dishFlavor: string,
  dishId: number,
  id: number,
  image: string,
  name: string,
  number: number,
  setmealId: number,
  userId: number,
}

export interface IShoppingCartEntity extends Omit<IShoppingCart, 'createTime'> {
  createTime: Date
}