import { Controller, Post, UploadedFile, UseInterceptors, Req, Inject } from '@nestjs/common'
import { CommonService } from './common.service'
import R from 'src/utils/response'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname, resolve } from 'path'
import { v4 as uuid_v4 } from 'uuid'
import { Request } from 'express'
import os from 'os'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

function getNetworkIp() {
  let needHost = '' // 打开的host
  try {
    // 获得网络接口列表
    const network = os.networkInterfaces()
    // console.log("network",network)
    for (const dev in network) {
      const iface = network[dev]
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i]
        if (
          alias.family === 'IPv4' &&
          alias.address !== '127.0.0.1' &&
          !alias.internal
        ) {
          needHost = alias.address
        }
      }
    }
  } catch (e) {
    needHost = 'localhost'
  }
  return needHost
}

@ApiBearerAuth('bearer')
@ApiTags('通用接口')
@Controller('/admin/common')
export class CommonController {
  @Inject(CommonService)
  private readonly commonService: CommonService

  private host: string

  constructor() {
    this.host = getNetworkIp()
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (_, file, cb) => {
        let temp = ''
        if (file.mimetype.startsWith('image')) {
          temp = '/images'
        }
        const path = resolve(process.cwd(), `./public${temp}`)
        cb(null, path)
      },
      filename: (_, file, cb) => {
        const ext = extname(file.originalname)
        const _filename = uuid_v4()
        cb(null, _filename + ext)
      }
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const host = this.host
    const protocol = req.protocol
    return R.success(`${protocol}://${host}:${process.env.PORT}/public/images/${file.filename}`)
  }
}
