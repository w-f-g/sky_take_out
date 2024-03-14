/* eslint-env node */
const { resolve } = require('path')
const { existsSync } = require('fs')
const fs = require('fs/promises')
const { execSync } = require('child_process')

async function buildApp() {
  const distAppPath = resolve(process.cwd(), '../../dist/app')
  const flag = await existsSync(distAppPath)
  if (flag) {
    await fs.rmdir(distAppPath, { recursive: true })
  }
  
  const rootPackagePath = resolve(__dirname, './package-template.json')
  const appPackagePath = resolve(__dirname, '../dist-electron/package.json')

  await fs.copyFile(rootPackagePath, appPackagePath)
  execSync('electron-builder -w -c ./electron/electron-builder.yml', { stdio: 'inherit' })
}

execSync('pnpm build:app', { stdio: 'inherit' })
buildApp()