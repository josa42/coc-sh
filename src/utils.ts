import fs from 'fs'
import path from 'path'
import { workspace } from 'coc.nvim'
import which from 'which'


export async function configDir(...names: string[]): Promise<string> {
  const home = require('os').homedir()
  const dir = path.join(home, '.config', 'coc', 'sh', ...names)

  return new Promise((resolve): void => {
    fs.mkdirSync(dir, { recursive: true })
    resolve(dir)
  })
}

export async function pkgBin(name: string): Promise<string> {
  let bin = path.join(await configDir('tools'), 'node_modules', '.bin', name)
  try {
    bin = fs.realpathSync(bin)
  } catch(e) {
    // ignore
  }

  return bin
}

export async function pkgBinExists(name: string): Promise<boolean> {
  const bin = await pkgBin(name)
  return new Promise((resolve): void => fs.open(bin, 'r', (err): void => resolve(err === null)))
}

export async function pkgInstall(name: string, force = false): Promise<boolean> {
  if (!force && await pkgBinExists(name)) {
    return true
  }

  return yarnRun(`add ${name}`)
}

export async function pkgUpgrade(name: string): Promise<boolean> {
  return yarnRun(`upgrade ${name}`)
}

async function yarnRun(args: string): Promise<boolean> {
  const toolsPath = await configDir('tools')

  const cmd = `cd ${toolsPath}; npm ${args}`
  const res = await workspace.runTerminalCommand(cmd)

  return res.success
}

export async function commandExists(command: string): Promise<boolean> {
  return new Promise((resolve): void => which(command, (err): void => resolve(err == null)))
}
