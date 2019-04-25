import path from 'path'
import { TransportKind, ExtensionContext, LanguageClient, ServerOptions, commands, workspace, services, LanguageClientOptions } from 'coc.nvim'

export async function activate(context: ExtensionContext): Promise<void> {
  let { subscriptions } = context
  const config = workspace.getConfiguration().get('docker', {}) as any
  const enable = config.enable
  if (enable === false) return

  let serverModule = context.asAbsolutePath(path.join('node_modules', 'bash-language-server', 'bin', 'main.js'));

  let serverOptions: ServerOptions = {
    command: serverModule,
    args: ['start'],
    transport: TransportKind.stdio
  };

  let clientOptions: LanguageClientOptions = {
    documentSelector: ['sh']
  };

  const client = new LanguageClient(
    "bash-language-server",
    "Bash Language Server",
    serverOptions,
    clientOptions
  );

  subscriptions.push(
    services.registLanguageClient(client)
  )

  subscriptions.push(commands.registerCommand("sh.version", async () => {
    const v = require(path.resolve(__dirname, '..', 'package.json')).version
    workspace.showMessage(`Version: ${v}`, 'more')
  }))
}

