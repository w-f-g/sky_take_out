/** 分页返回类型 */
export interface IPageResult<T> {
    records: T[],
    total: number,
}

export interface IPageQuery {
    /** 页码 */
    page: string,
    /** 每页记录数 */
    pageSize: string,
}

/** 响应数据返回类型 */
export interface IResponse<T = null> {
    code: number,
    data: T,
    msg: string,
}

/** entity 实体类中的公共字段 */
export interface IEntityCommon {
  createTime: Date,
  createUser: number,
  updateTime: Date,
  updateUser: number,
}