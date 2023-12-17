import { Body, Controller, Get, HttpStatus, Inject, Param, Post, Put, Query } from '@nestjs/common'
import { EmployeeService } from './employee.service'
import { EditEmployeeDTO, EmployeeDTO, EmployeeLoginDTO, EmployeePageDTO, PasswordEditDTO } from './dto/employee.dto'
import R from 'src/utils/response'
import { EmployeeLoginVO, EmployeePageVO, EmployeeVO } from './vo/employee.vo'
import { JwtService } from '@nestjs/jwt'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SkipAuth } from 'src/auth/skip-auth.decorator'

@ApiTags('员工相关接口')
@ApiBearerAuth('bearer')
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
  @SkipAuth()
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
  @SkipAuth()
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
  
  @ApiOperation({ summary: '编辑员工信息' })
  @Put()
  async editEmployeeIndo(@Body() employee: EditEmployeeDTO) {
    await this.employeeService.editEmployee(employee)
    return R.success(null)
  }

  @ApiOkResponse({
    type: EmployeePageVO,
  })
  @ApiOperation({ summary: '员工分页查询' })
  @Get('/page')
  async getEmployeePage(@Query() query: EmployeePageDTO) {
    console.log(query)
    const res = await this.employeeService.getEmployeePage(query)
    return R.success(res)
  }

  @ApiOperation({ summary: '启用禁用员工账号' })
  @Post('/status/:status')
  async changeEmployeeStatus(
    @Param('status') status: number,
    @Query('id') id: number,
  ) {
    await this.employeeService.changeEmployeeStatus(status, id)
    return R.success(null)
  }

  @ApiOkResponse({ type: EmployeeVO })
  @ApiOperation({ summary: '根据id查询员工' })
  @Get('/:id')
  async getEmployeeInfoById(@Param('id') id: number) {
    const info = await this.employeeService.findEmployeeInfoById(id)
    return R.success(info)
  }

  @ApiOperation({ summary: '修改密码' })
  @Put('/editPassword')
  async editPassword(@Body() data: PasswordEditDTO) {
    await this.employeeService.editPassword(data)
    return R.success(null)
  }
}
