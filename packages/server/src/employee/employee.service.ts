import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { IEmployeeInfo } from '@sky_take_out/types'
import { Repository } from 'typeorm'
import { Employee } from './entities/employee.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { EmployeeLoginVO } from './vo/employee.vo'
import { EmployeeLoginDTO } from './dto/employee.dto'

@Injectable()
export class EmployeeService {
  @InjectRepository(Employee)
  private employeeRepository: Repository<Employee>

  async login({ username, password }: EmployeeLoginDTO): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({
      username,
    })
    if (employee.password !== password) {
      throw new HttpException('密码错误', HttpStatus.NOT_FOUND)
    }
    if (employee.status === 0) {
      throw new HttpException('账号被锁定', HttpStatus.NOT_FOUND)
    }
    return employee
  }
  
  async findEmployeeInfoById(id: number): Promise<IEmployeeInfo> {
    const info = await this.employeeRepository.findOneBy({
      id,
    })
    return info
  }
}
