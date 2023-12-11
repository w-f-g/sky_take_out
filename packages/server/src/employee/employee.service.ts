import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { IEmployeeVO } from '@sky_take_out/types'
import { FindManyOptions, Like, Repository } from 'typeorm'
import { Employee, buildEmployee } from './entities/employee.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { EmployeeDTO, EmployeeLoginDTO, EmployeePageDTO } from './dto/employee.dto'
import { MessageConstant, StatusConstant } from 'src/utils/constant'
import { md5 } from 'src/utils'
import { EmployeePageVO, EmployeeVO } from './vo/employee.vo'

@Injectable()
export class EmployeeService {
  @InjectRepository(Employee)
  private employeeRepository: Repository<Employee>

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

  async changeEmployeeStatus(status: number, id: number) {
    const employee = await this.employeeRepository.findOneBy({
      id,
    })
    // 查询账号是否存在
    if (employee === null) {
      throw new HttpException(MessageConstant.ACCOUNT_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
    await this.employeeRepository.update(id, {
      status,
    })

  }
  
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
}
