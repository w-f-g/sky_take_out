/**
 * 工登录时传递的数据模型
 */
export interface IEmployeeLoginDTO {
    /**
     * 密码
     */
    password: string,
    /**
     * 用户名
     */
    username: string,
}

/**
 * 员工登录返回的数据格式
 */
export interface IEmployeeLoginVO {
    /**
     * 主键值
     */
    id: number,
    /**
     * 姓名
     */
    name: string,
    /**
     * jwt令牌
     */
    token: string,
    /**
     * 用户名
     */
    userName: string,
}