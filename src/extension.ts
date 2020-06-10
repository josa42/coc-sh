import path from 'path'
import fs from 'fs'
import pkgDir from 'pkg-dir'
import { TransportKind, ExtensionContext, LanguageClient, ServerOptions, commands, workspace, services, LanguageClientOptions } from 'coc.nvim'

interface ShConfig {
  enable: boolean
  commandPath: string
}

export async function activate(context: ExtensionContext): Promise<void> {
  const config = workspace.getConfiguration().get('sh', {}) as ShConfig
  if (config.enable === false) {
    return
  }

  const serverOptions: ServerOptions = {
    command: (config.commandPath || await serverBin()),
    args: ['start'],
    transport: TransportKind.stdio
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: ['sh']
  }

  const client = new LanguageClient('sh', 'bash-language-server', serverOptions, clientOptions)

  context.subscriptions.push(
    services.registLanguageClient(client),
    commands.registerCommand("sh.version", async () => {
      const rootDir = await pkgDir(__dirname)
      const { version } = JSON.parse(fs.readFileSync(path.resolve(rootDir, 'package.json'), 'utf-8'))

      workspace.showMessage(`Version: ${version} [node: ${process.versions.node}]`, 'more')
    })
  )
}

async function serverBin(): Promise<string> {
  const rootDir = await pkgDir(__dirname)
  let bin = path.join(rootDir, 'node_modules', 'bash-language-server', 'bin', 'main.js')
  try {
    bin = fs.realpathSync(bin)
  } catch (e) {
    // ignore
  }

  return bin
}

