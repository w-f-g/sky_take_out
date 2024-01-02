import { Body, Controller, Inject, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { WXLoginDTO } from './dto/user.dto'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import R from 'src/utils/response'
import { JwtService } from '@nestjs/jwt'
import { WXLoginVO } from './vo/user.vo'

@ApiTags('C端-用户接口')
@Controller('/user/user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService
  
  @Inject(JwtService)
  private jwtService: JwtService

  @ApiOkResponse({ type: WXLoginVO })
  @ApiOperation({ summary: '微信登录' })
  @Post('/login')
  async wxLogin(@Body() data: WXLoginDTO) {
    const user = await this.userService.wxLogin(data)
    const token = this.jwtService.sign({
      userId: user.id,
    })
    const res: WXLoginVO = {
      id: user.id,
      openid: user.openid,
      token,
    }
    return R.success(res)
  }
}
