import path from 'path'
import fs from 'fs'
import { ExtensionContext, LanguageClient, LanguageClientOptions, ServerOptions, TransportKind, commands, services, window, workspace } from 'coc.nvim'

interface ShConfig {
  enable: boolean
  commandPath: string
  highlightParsingErrors: boolean
  explainshellEndpoint: string
  globPattern: string
}


export async function activate(context: ExtensionContext): Promise<void> {
  const config = workspace.getConfiguration().get('sh', {}) as ShConfig
  if (config.enable === false) {
    return
  }

  const serverOptions: ServerOptions = {
    command: (config.commandPath || require.resolve('bash-language-server/out/cli.js')),
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
      const rootDir = path.join(__dirname, '..')
      const { version } = JSON.parse(fs.readFileSync(path.resolve(rootDir, 'package.json'), 'utf-8'))

      window.showInformationMessage(`Version: ${version} [node: ${process.versions.node}]`)
    })
  )
}
