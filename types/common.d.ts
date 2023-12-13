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