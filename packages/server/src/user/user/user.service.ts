import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import axios from 'axios'
import { WXLoginDTO } from './dto/user.dto'
import { buildEntity, isEmpty } from 'src/utils'
import { MessageConstant } from 'src/utils/constant'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  private WX_LOGIN_URL = 'https://api.weixin.qq.com/sns/jscode2session'

  @InjectRepository(User)
  private userRepository: Repository<User>

  private async getWXOpenId(code: string) {
    let openid: string
    try {
      // 调用微信接口服务，获取当前微信用户的 openid
      const wxLoginRes = await axios.get(this.WX_LOGIN_URL, {
        params: {
          appid: process.env.WX_APP_ID,
          secret: process.env.WX_APP_SECRET,
          'js_code': code,
          'grant_type': 'authorization_code',
        }
      })
      openid = wxLoginRes.data.openid
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN)
    }
    return openid
  }
  
  /** 微信登录 service */
  async wxLogin(data: WXLoginDTO): Promise<User> {
    const openid = await this.getWXOpenId(data.code)
    // 判断 openid 是否为空，如果为空表示登录失败，抛出业务异常
    if (isEmpty(openid)) {
      throw new UnauthorizedException(MessageConstant.LOGIN_FAILED)
    }
    // 判断当前用户是否为新用户
    let user = await this.userRepository.findOneBy({
      openid,
    })
    // 如果是新用户，自动完成注册
    if (isEmpty(user)) {
      user = buildEntity(User, {
        openid,
        createTime: new Date(),
      })
      await this.userRepository.insert(user)
    }

    return user
  }
}
