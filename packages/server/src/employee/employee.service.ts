import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { IEmployeeVO } from '@sky_take_out/types'
import { FindManyOptions, Like, Repository, UpdateResult } from 'typeorm'
import { Employee } from './entities/employee.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { EditEmployeeDTO, EmployeeDTO, EmployeeLoginDTO, EmployeePageDTO, PasswordEditDTO } from './dto/employee.dto'
import { MessageConstant, StatusConstant } from 'src/utils/constant'
import { buildEntity, md5 } from 'src/utils'
import { EmployeePageVO, EmployeeVO } from './vo/employee.vo'

@Injectable()
export class EmployeeService {
  @InjectRepository(Employee)
  private employeeRepository: Repository<Employee>

  /** 员工登录 service */
  async login({ username, password }: EmployeeLoginDTO): Promise<Employee> {
    const _pwd = md5(password)
    const employee = await this.employeeRepository.findOneBy({
      username,
    })
    if (employee === null) {
      throw new HttpException(MessageConstant.ACCOUNT_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
    if (employee.password !== _pwd) {
      throw new HttpException(MessageConstant.PASSWORD_ERROR, HttpStatus.NOT_FOUND)
    }
    if (employee.status === 0) {
      throw new HttpException(MessageConstant.ACCOUNT_LOCKED, HttpStatus.NOT_FOUND)
    }
    return employee
  }

  /** 新增员工 service */
  async addEmployee(employee: EmployeeDTO) {
    const _e = buildEntity(Employee, {
      ...employee,
      status: StatusConstant.ENABLE,
      password: md5('123456'),
    })
    
    try {
      await this.employeeRepository.insert(_e)
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN)
    }
  }

  /** 编辑员工信息 service */
  async editEmployee(employee: EditEmployeeDTO) {
    const _e = buildEntity(Employee, employee)
    try {
      const res = await this.employeeRepository.update(employee.id, _e)
      if (res.affected === 0) {
        throw new Error(`更新失败id: ${employee.id} 记录不存在`)
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN)
    }
  }

  /** 员工分页查询 service */
  async getEmployeePage({ name, page, pageSize }: EmployeePageDTO): Promise<EmployeePageVO> {
    const _p = +page
    const _ps = +pageSize
    const limitQuery: FindManyOptions<Employee> = {
      take: _ps,
      skip: (_p - 1) * _ps,
    }
    if (name) {
      limitQuery.where = {
        name: Like(`%${name}%`),
      }
    }
    const [employees, total] = await this.employeeRepository.findAndCount(limitQuery)
    return {
      records: employees as unknown as IEmployeeVO[],
      total,
    }
  }

  /** 启用禁用员工账号 service */
  async changeEmployeeStatus(status: StatusConstant, id: number) {
    const _e = buildEntity(Employee, {
      status,
    })
    let res: UpdateResult
    try {
      res = await this.employeeRepository.update(id, _e)
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN)
    }
    if (res.affected === 0) {
      throw new HttpException(MessageConstant.ACCOUNT_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
  }
  
  /** 根据id查询员工 service */
  async findEmployeeInfoById(id: number): Promise<EmployeeVO> {
    const info = await this.employeeRepository.findOneBy({
      id,
    })
    if (info === null) {
      throw new HttpException(MessageConstant.ACCOUNT_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
    info.password = '*****'
    return info as unknown as EmployeeVO
  }

  /** 修改员工密码 service */
  async editPassword(data: PasswordEditDTO) {
    const info = await this.employeeRepository.findOneBy({
      id: data.empId,
    })
    if (info === null) {
      throw new HttpException(MessageConstant.ACCOUNT_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    const _oldPassword = md5(data.oldPassword)
    // 旧密码错误
    if (info.password !== _oldPassword) {
      throw new HttpException(MessageConstant.PASSWORD_ERROR, HttpStatus.FORBIDDEN)
    }

    const _newPassword = md5(data.newPassword)
    // 新密码与旧密码相同
    if (info.password === _newPassword) {
      throw new HttpException(
        MessageConstant.PASSWORD_EDIT_FAILED + '，不能与原密码相同',
        HttpStatus.FORBIDDEN
      )
    }

    const _e = buildEntity(Employee, {
      password: _newPassword,
    })
    // 改密码
    try {
      await this.employeeRepository.update(data.empId, _e)
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN)
    }
  }
}
