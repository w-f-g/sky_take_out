import { Controller, Post, UploadedFile, UseInterceptors, Req, Inject, UseGuards, HttpException, HttpStatus, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common'
import { CommonService } from './common.service'
import R from 'src/utils/response'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname, resolve } from 'path'
import { v4 as uuid_v4 } from 'uuid'
import { Request } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { AdminAuthGuard } from 'src/auth/AdminAuth.guard'

@ApiTags('通用接口')
@UseGuards(AdminAuthGuard)
@Controller('/admin/common')
export class CommonController {
  @Inject(CommonService)
  private readonly commonService: CommonService

  private host: string

  constructor() {
    this.host = process.env.MYSQL_HOST
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (_, file, cb) => {
        const path = resolve(process.cwd(), './public/images')
        cb(null, path)
      },
      filename: (_, file, cb) => {
        const ext = extname(file.originalname)
        const _filename = uuid_v4()
        cb(null, _filename + ext)
      },
    }),
    fileFilter: (req: Request, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new HttpException('仅能上传 PNG JPEG JPG类型图片', HttpStatus.FORBIDDEN), false)
      }
      cb(null, true)
    }
  }))
  uploadFile(
    @UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 1024 * 1024 * 2,
          message: '图片大小不超过2M',
        }),
      ]
    }))
    file: Express.Multer.File,
    @Req()
    req: Request
  ) {
    const host = this.host
    const protocol = req.protocol
    return R.success(`${protocol}://${host}:${process.env.PORT}/public/images/${file.filename}`)
  }
}
