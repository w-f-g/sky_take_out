import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {

  @Inject(JwtService)
  private jwtService: JwtService

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const authorization = request.header('authorization') || ''
    const token = authorization.replace('Bearer ', '')

    if (token === '') {
      throw new UnauthorizedException('请先登录！')
    }
    try {
      const info: Record<'empId', number> = await this.jwtService.verifyAsync(token)
      if (info.empId) {
        // 注入解析 token 获取的用户信息，绕开 ts 的类型检查
        Object.defineProperty(request, 'meta', {
          get() {
            return {
              userInfo: info,
            }
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
