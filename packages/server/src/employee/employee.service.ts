import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { IEmployeeInfo } from '@sky_take_out/types'
import { Repository } from 'typeorm'
import { Employee } from './entities/employee.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { EmployeeDTO, EmployeeLoginDTO } from './dto/employee.dto'
import { MessageConstant, StatusConstant } from 'src/utils/constant'
import { md5 } from 'src/utils'

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

  async addEmployee(employee: EmployeeDTO) {
    const now = new Date()
    const _e = new Employee()
    _e.idNumber = employee.idNumber
    _e.name = employee.name
    _e.phone = employee.phone
    _e.sex = employee.sex
    _e.username = employee.username

    _e.status = StatusConstant.ENABLE
    _e.password = md5('123456')
    _e.createTime = now
    _e.updateTime = now

    _e.createUser = 10
    _e.updateUser = 10
    try {
      await this.employeeRepository.insert(_e)
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN)
    }
  }
  
  async findEmployeeInfoById(id: number): Promise<IEmployeeInfo> {
    const info = await this.employeeRepository.findOneBy({
      id,
    })
    return info
  }
}
