import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { IEmployeeInfo } from '@sky_take_out/types'
import { Repository } from 'typeorm'
import { Employee } from './entities/employee.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { EmployeeLoginDTO } from './dto/employee.dto'
import { MessageConstant } from 'src/utils/constant'

@Injectable()
export class EmployeeService {
  @InjectRepository(Employee)
  private employeeRepository: Repository<Employee>

  async login({ username, password }: EmployeeLoginDTO): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({
      username,
    })
    if (employee === null) {
      throw new HttpException(MessageConstant.ACCOUNT_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
    if (employee.password !== password) {
      throw new HttpException(MessageConstant.PASSWORD_ERROR, HttpStatus.NOT_FOUND)
    }
    if (employee.status === 0) {
      throw new HttpException(MessageConstant.ACCOUNT_LOCKED, HttpStatus.NOT_FOUND)
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
