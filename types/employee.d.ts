export interface IEmployee {
    id: number,
    /** 身份证号 */
    idNumber: string,
    name: string,
    password: string,
    phone: string,
    sex: string,
    /** 账号状态 */
    status: number,
    username: string,
}

/**
 * 工登录时传递的数据模型
 */
export interface IEmployeeLoginDTO extends Pick<IEmployee, 'username' | 'password'> {}

/**
 * 员工登录返回的数据格式
 */
export interface IEmployeeLoginVO extends Pick<IEmployee, 'id' | 'name' | 'username'> {
    /**
     * jwt令牌
     */
    token: string,
}

/**
 * 员工信息
 */
export interface IEmployeeInfo extends IEmployee {
    createTime: Date,
    createUser: number,
    updateTime: Date,
    updateUser: number,
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

/**
 * EmployeeDTO
 */
export interface IEmployeeDTO extends Omit<IEmployee, 'password' | 'status' | 'id'> {
    /**
     * 员工id
     */
    id?: number;
}