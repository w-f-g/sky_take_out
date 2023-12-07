export interface IResponse<T = null> {
    code: number,
    data: T,
    msg: string,
}