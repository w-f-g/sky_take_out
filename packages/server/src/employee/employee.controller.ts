import { Body, Controller, Get, Inject, Param, Post, Put } from '@nestjs/common'
import { EmployeeService } from './employee.service'
import { EmployeeLoginDTO } from './dto/employee.dto'
import R from 'src/utils/response'
import { EmployeeLoginVO } from './vo/employee.vo'
import { IEmployeeInfo } from '@sky_take_out/types'
import { JwtService } from '@nestjs/jwt'

@Controller('/admin/employee')
export class EmployeeController {
  @Inject(JwtService)
  private readonly jwtService: JwtService
  
  @Inject(EmployeeService)
  private readonly employeeService: EmployeeService

  @Post('/login')
  async login(@Body() loginInfo: EmployeeLoginDTO): Promise<R<EmployeeLoginVO>> {
    console.log(loginInfo)
    const employee = await this.employeeService.login(loginInfo)
    const token = this.jwtService.sign({
      empId: employee.id,
    })
    return R.success({
      id: employee.id,
      name: employee.name,
      userName: employee.username,
      token,
    })
  }

  @Post('/logout')
  logout() {
    return R.success(null)
  }

  @Get('/:id')
  async getEmployeeInfoById(@Param('id') id: number): Promise<R<IEmployeeInfo>> {
    const info = await this.employeeService.findEmployeeInfoById(id)
    return R.success(info)
  }


  @Put('/editPassword')
  editPassword(@Body() info) {
    return R.success('ok')
  }
}
