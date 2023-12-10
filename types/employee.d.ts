/** 员工基础类型 */
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
 * 员工登录时传递的数据模型
 */
export interface IEmployeeLoginDTO extends Pick<IEmployee, 'username' | 'password'> {}

/**
 * 员工登录返回的数据格式
 */
export interface IEmployeeLoginVO extends Pick<IEmployee, 'id' | 'name'> {
    /**
     * jwt令牌
     */
    token: string,

    userName: string,
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
 * 修改员工密码 DTO
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
    id?: number,
}

/** 员工分页 DTO */
export interface IEmployeePageQueryDTO {
    /**
     * 员工姓名
     */
    name?: string,
    /**
     * 页码
     */
    page: string,
    /**
     * 每页记录数
     */
    pageSize: string,
}

/** 员工分页 DTO */
export interface IEmployeePageQueryVO extends IEmployee {
    createTime: string,
    createUser: number,
    updateTime: string,
    updateUser: number,
}

export interface IPageResult<T> {
    records: T[];
    total: number;
}