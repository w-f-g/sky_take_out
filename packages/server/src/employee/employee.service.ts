import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { IEmployeeVO } from '@sky_take_out/types'
import { FindManyOptions, Like, Repository } from 'typeorm'
import { Employee, buildEmployee } from './entities/employee.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { EditEmployeeDTO, EmployeeDTO, EmployeeLoginDTO, EmployeePageDTO, PasswordEditDTO } from './dto/employee.dto'
import { MessageConstant, StatusConstant } from 'src/utils/constant'
import { md5 } from 'src/utils'
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
  async addEmployee(employee: EmployeeDTO, empId: number) {
    const now = new Date()
    const _e = buildEmployee(
      employee,
      StatusConstant.ENABLE,
      md5('123456'),
      now,
      now,
      empId,
      empId
    )
    
    try {
      await this.employeeRepository.insert(_e)
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN)
    }
  }

  /** 编辑员工信息 service */
  async editEmployee(employee: EditEmployeeDTO, empId: number) {
    const _e = new Employee()
    Object.entries(employee).forEach(([k, v]) => {
      _e[k] = v
    })
    _e.updateUser = empId
    _e.updateTime = new Date()
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
  async changeEmployeeStatus(status: number, id: number, empId: number) {
    const employee = await this.employeeRepository.findOneBy({
      id,
    })
    // 查询账号是否存在
    if (employee === null) {
      throw new HttpException(MessageConstant.ACCOUNT_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
    await this.employeeRepository.update(id, {
      status,
      updateUser: empId,
      updateTime: new Date(),
    })

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

  async editPassword(data: PasswordEditDTO, empId: number) {
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

    // 买密码
    try {
      await this.employeeRepository.update(data.empId, {
        password: _newPassword,
        updateUser: empId,
        updateTime: new Date(),
      })
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN)
    }
  }
}
