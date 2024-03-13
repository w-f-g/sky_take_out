/* eslint-env node */
const { resolve } = require('path')
const fs = require('fs/promises')
const { execSync } = require('child_process')

async function buildApp() {
  const rootPackagePath = resolve(__dirname, './package.json')
  const appPackagePath = resolve(__dirname, '../dist-electron/package.json')

  await fs.copyFile(rootPackagePath, appPackagePath)
  execSync('electron-builder --dir -c ./electron/electron-builder.yml', { stdio: 'inherit' })
}

execSync('pnpm build:app', { stdio: 'inherit' })
buildApp()