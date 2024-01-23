const zlib = require('zlib')
const { resolve } = require('path')
const { exec, spawn } = require('child_process')
const { existsSync, unlinkSync, createReadStream, createWriteStream, mkdirSync } = require('fs')

const mode = 'server'
const dockerImageName = `sky_take_out_${mode}`
const OUTPUT_PATH = resolve(process.cwd(), 'dist')
const outputFile = `${OUTPUT_PATH}/${dockerImageName}.tar`

const exit = () => process.exit(1)
const log = str => {
  console.log(`----------------------- ${str} -----------------------`)
}

/** 检查文件是否存在，存在则删除 */
function removeFile(path) {
  if (existsSync(path)) {
    try {
      unlinkSync(path)
    } catch (error) {
      console.error(error)
      exit()
    }
  }
}

function gzip(inputFilePath, outputFilePath) {
  return new Promise((resolve, reject) => {
    const inputStream = createReadStream(inputFilePath)
    const gzipStream = zlib.createGzip()
    const outputStream = createWriteStream(outputFilePath)

    inputStream.pipe(gzipStream).pipe(outputStream)
    outputStream.on('finish', () => {
      resolve()
    })
    outputStream.on('error', (err) => {
      reject(err)
    })
  })
}

/** 构建 Docker 镜像 */
function buildDockerImage() {
  return new Promise((resolve, reject) => {
    log('开始构建 Docker 镜像')
    console.log()

    const dockerBuild = spawn(
      'docker',
      ['build', '.', '--target', 'server', '--tag', dockerImageName],
      { stdio: 'inherit' }
    )
    dockerBuild.on('error', (err) => {
      dockerBuild.kill()
      reject(err)
    })
    dockerBuild.once('close', code => {  
      if (code === 0) {
        resolve()
      } else {
        dockerBuild.kill()
        reject(new Error('程序异常关闭'))
      }
    })
  })
}

/** 导出 Docker 镜像 */
function exportDockerImage() {
  return new Promise((resolve, reject) => {
    const command = `docker save -o ${outputFile} ${dockerImageName}`
    exec(command, err => {
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })
}

exec('docker', async err => {
  if (err) {
    console.error('构建失败，请先安装 Docker')
    return exit()
  }
  const gzPath = outputFile + '.gz'
  if (!existsSync(OUTPUT_PATH)) {
    mkdirSync(OUTPUT_PATH)
  } else {
    // 删除之前的构建产物
    removeFile(gzPath)
  }
  try {
    // 构建新镜像
    await buildDockerImage()
    console.log()
    log('镜像构建成功，开始导出镜像')
    let timer = setInterval(() => {
      console.log('正在导出......')
    }, 1000)
    // 导出 .tar 格式镜像
    await exportDockerImage()
    // gzip 压缩
    await gzip(outputFile, gzPath)
    // 删除 .tar 格式镜像
    removeFile(outputFile)
    clearInterval(timer)
    timer = null
    log('导出成功')
    console.log(`请访问：${gzPath}`)
  } catch (error) {
    console.error(error)
    exit()
  }
})