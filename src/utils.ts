import fs from 'fs'
import path from 'path'
import { workspace } from 'coc.nvim'
import which from 'which'


export async function configDir(...names: string[]): Promise<string> {
  const home = require('os').homedir();
  const dir = path.join(home, '.config', 'coc', 'sh', ...names);

  return new Promise((resolve) => {
    fs.mkdirSync(dir, { recursive: true });
    resolve(dir)
  })
}

export async function pkgBin(name: string): Promise<string> {
  let bin = path.join(await configDir('tools'), 'node_modules', '.bin', name)
  try {
    bin = fs.realpathSync(bin)
  } catch(e) {}

  return bin
}

export async function pkgBinExists(name: string): Promise<boolean> {
  const bin = await pkgBin(name)
  return new Promise(resolve => fs.open(bin, 'r', (err, _) => resolve(err === null)));
}

export async function pkgInstall(name: string, force: boolean = false) {
  if (!force && await pkgBinExists(name)) {
    return
  }

  return yarnRun(`add ${name}`)
}

export async function pkgUpgrade(name: string) {
  return yarnRun(`upgrade ${name}`)
}

async function yarnRun(args: string): Promise<boolean> {
  const toolsPath = await configDir('tools')

  const cmd = `cd ${toolsPath}; npm ${args}`
  const res = await workspace.runTerminalCommand(cmd)

  return res.success
}

export async function commandExists(command: string): Promise<boolean> {
  return new Promise(resolve => which(command, (err, _: string) => resolve(err == null)));
}
