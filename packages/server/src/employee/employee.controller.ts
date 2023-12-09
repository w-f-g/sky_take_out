import { Body, Controller, Get, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common'
import { EmployeeService } from './employee.service'
import { EmployeeDTO, EmployeeLoginDTO } from './dto/employee.dto'
import R from 'src/utils/response'
import { EmployeeLoginVO } from './vo/employee.vo'
import { IEmployeeInfo } from '@sky_take_out/types'
import { JwtService } from '@nestjs/jwt'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('员工相关接口')
@Controller('/admin/employee')
export class EmployeeController {
  @Inject(JwtService)
  private jwtService: JwtService
  
  @Inject(EmployeeService)
  private employeeService: EmployeeService

  @ApiOperation({ summary: '员工登录' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '请求成功',
    type: EmployeeLoginVO,
  })
  @Post('/login')
  async login(@Body() loginInfo: EmployeeLoginDTO): Promise<R<EmployeeLoginVO>> {
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

  @ApiOperation({ summary: '退出登录' })
  @Post('/logout')
  logout() {
    return R.success(null)
  }

  @ApiOperation({ summary: '新增员工' })
  @Post()
  async addEmployee(@Body() employee: EmployeeDTO){
    await this.employeeService.addEmployee(employee)
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
