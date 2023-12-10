import { Body, Controller, Get, HttpStatus, Inject, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common'
import { EmployeeService } from './employee.service'
import { EmployeeDTO, EmployeeLoginDTO, EmployeePageDTO } from './dto/employee.dto'
import R from 'src/utils/response'
import { EmployeeLoginVO, EmployeePageVO } from './vo/employee.vo'
import { IEmployeeInfo } from '@sky_take_out/types'
import { JwtService } from '@nestjs/jwt'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/guards/auth.guard'

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

  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: '新增员工' })
  @UseGuards(AuthGuard)
  @Post()
  async addEmployee(@Body() employee: EmployeeDTO, @Request() req){
    const { empId } = req.meta.userInfo
    await this.employeeService.addEmployee(employee, +empId)
    return R.success(null)
  }

  @ApiBearerAuth('bearer')
  @ApiOkResponse({
    type: EmployeePageVO,
  })
  @ApiOperation({ summary: '员工分页查询' })
  @UseGuards(AuthGuard)
  @Get('/page')
  async getEmployeePage(@Query() query: EmployeePageDTO) {
    console.log(query)
    const res = await this.employeeService.getEmployeePage(query)
    return R.success(res)
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
