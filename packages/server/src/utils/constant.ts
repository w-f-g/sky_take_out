/**
 * 信息提示常量
 */
export enum MessageConstant {
  PASSWORD_ERROR = '密码错误',
  ACCOUNT_NOT_FOUND = '账号不存在',
  ACCOUNT_LOCKED = '账号被锁定',
  ALREADY_EXISTS = '已存在',
  UNKNOWN_ERROR = '未知错误',
  USER_NOT_LOGIN = '用户未登录',
  CATEGORY_BE_RELATED_BY_SETMEAL = '当前分类关联了套餐,不能删除',
  CATEGORY_BE_RELATED_BY_DISH = '当前分类关联了菜品,不能删除',
  SHOPPING_CART_IS_NULL = '购物车数据为空，不能下单',
  ADDRESS_BOOK_IS_NULL = '用户地址为空，不能下单',
  LOGIN_FAILED = '登录失败',
  UPLOAD_FAILED = '文件上传失败',
  SETMEAL_ENABLE_FAILED = '套餐内包含未启售菜品，无法启售',
  PASSWORD_EDIT_FAILED = '密码修改失败',
  DISH_ON_SALE = '起售中的菜品不能删除',
  SETMEAL_ON_SALE = '起售中的套餐不能删除',
  DISH_BE_RELATED_BY_SETMEAL = '当前菜品关联了套餐,不能删除',
  ORDER_STATUS_ERROR = '订单状态错误',
  ORDER_NOT_FOUND = '订单不存在',
}

export enum JwtClaimsConstant {
  EMP_ID = 'empId',
  USER_ID = 'userId',
  PHONE = 'phone',
  USERNAME = 'username',
  NAME = 'name',
}

/**
 * 状态常量，启用或者禁用
 */
export enum StatusConstant {
  //启用
  ENABLE = 1,
  //禁用
  DISABLE = 0,
}

/**
 * 分类类型
 */
export enum CategoryType {
  DISHES = 1,
  SET_MEAL = 2,
}

export enum CategoryTypeString {
  DISHES = '1',
  SET_MEAL = '2',
}

export enum SexType {
  MAN = '1',
  WOMAN = '0',
}

/**
 * 公共字段自动填充相关常量
 */
export enum AutoFillConstant {
  /**
   * 实体类中的方法名称
   */
  SET_CREATE_TIME = 'setCreateTime',
  SET_UPDATE_TIME = 'setUpdateTime',
  SET_CREATE_USER = 'setCreateUser',
  SET_UPDATE_USER = 'setUpdateUser',
}