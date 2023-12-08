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

/**
 * 员工信息
 */
export interface IEmployeeInfo {
    createTime: Date,
    createUser: number,
    id: number,
    idNumber: string,
    name: string,
    password: string,
    phone: string,
    sex: string,
    status: number,
    updateTime: Date,
    updateUser: number,
    username: string,
}

/**
 * 修改密码 DTO
 */
export interface IPasswordEditDTO {
    /**
     * 员工id
     */
    empId: number,
    /**
     * 新密码
     */
    newPassword: string,
    /**
     * 旧密码
     */
    oldPassword: string,
}