import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { ClsService, InjectCls } from 'nestjs-cls'
import { SKIP_AUTH_KEY } from './skip-auth.decorator'

@Injectable()
export class UserAuthGuard implements CanActivate {

  @Inject(JwtService)
  private jwtService: JwtService

  @Inject(Reflector)
  private readonly reflector: Reflector

  @InjectCls()
  private clsService: ClsService

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const skipAuth = this.reflector.get<boolean>(
      SKIP_AUTH_KEY,
      context.getHandler(),
    )
    // 跳过验证
    if (skipAuth) {
      return true
    }
    
    const request: Request = context.switchToHttp().getRequest()
    const token = request.header('authentication') || ''

    if (token === '') {
      throw new UnauthorizedException('请先登录！')
    }
    try {
      const info = await this.jwtService.verifyAsync(token)
      if (info.userId) {
        this.clsService.set('user', info)
        // 注入解析 token 获取的用户信息，绕开 ts 的类型检查
        Object.defineProperty(request, 'user', {
          get() {
            return info
          }
        })
        return Promise.resolve(true)
      }
      throw new UnauthorizedException('token 解析异常！')
    } catch(error) {
      console.log(error)
      throw new UnauthorizedException('身份过期，请重新登录！')
    }
  }
}
