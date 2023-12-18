import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { CommonService } from './common.service'
import R from 'src/utils/response'
import { SkipAuth } from 'src/auth/skip-auth.decorator'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname, resolve } from 'path'
import { v4 as uuid_v4 } from 'uuid'

@Controller('/admin/common')
export class CommonController {

  constructor(private readonly commonService: CommonService) {}

  @SkipAuth()
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
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return R.success(`/public/images/${file.filename}`)
  }
}
