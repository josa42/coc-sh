import path from 'path'
import { TransportKind, ExtensionContext, LanguageClient, ServerOptions, commands, workspace, services, LanguageClientOptions } from 'coc.nvim'
import { pkgBin, commandExists, pkgInstall, pkgUpgrade } from './utils'

export async function activate(context: ExtensionContext): Promise<void> {

  const config = workspace.getConfiguration().get('sh', {}) as any
  if (config.enable === false) {
    return
  }
  const command = config.commandPath || await pkgBin('bash-language-server')
  if (!await commandExists(command)) {
    await pkgInstall('bash-language-server')
  }

  const serverOptions: ServerOptions = {
    command,
    args: ['start'],
    transport: TransportKind.stdio
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: ['sh']
  }

  const client = new LanguageClient( 'sh', 'bash-language-server', serverOptions, clientOptions)

  context.subscriptions.push(
    services.registLanguageClient(client),
    commands.registerCommand("sh.version", async () => {
      const v = require(path.resolve(__dirname, '..', 'package.json')).version
      workspace.showMessage(`Version: ${v}`, 'more')
    }),
    commands.registerCommand("sh.update.bash-language-server", async () => {
      await pkgUpgrade('bash-language-server')
    })
  )
}

