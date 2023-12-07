import { Body, Controller, Post } from '@nestjs/common'
import { EmployeeService } from './employee.service'
import { EmployeeLoginDTO } from './dto/employee.dto'
import R from 'src/utils/response'
import { EmployeeLoginVO } from './vo/employee.vo'

@Controller('/admin/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('/login')
  login(@Body() loginInfo: EmployeeLoginDTO): R<EmployeeLoginVO> {
    console.log(loginInfo)
    return R.success({
      id: 1,
      userName: 'aaa',
      token: 'bbb',
      name: 'ccc',
    })
  }
}
