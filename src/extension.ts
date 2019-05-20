import path from 'path'
import pkgDir from 'pkg-dir'
import { TransportKind, ExtensionContext, LanguageClient, ServerOptions, commands, workspace, services, LanguageClientOptions } from 'coc.nvim'

export async function activate(context: ExtensionContext): Promise<void> {

  const config = workspace.getConfiguration().get('sh', {}) as any
  if (config.enable === false) {
    return
  }

  const rootDir = await pkgDir(__dirname);
  const command = path.join(rootDir, 'node_modules', 'bash-language-server', 'bin', 'main.js');

  let serverOptions: ServerOptions = {
    command,
    args: ['start'],
    transport: TransportKind.stdio
  };

  let clientOptions: LanguageClientOptions = {
    documentSelector: ['sh']
  };

  const client = new LanguageClient( 'sh', 'bash-language-server', serverOptions, clientOptions);

  context.subscriptions.push(
    services.registLanguageClient(client),
    commands.registerCommand("sh.version", async () => {
      const v = require(path.resolve(__dirname, '..', 'package.json')).version
      workspace.showMessage(`Version: ${v}`, 'more')
    })
  )
}

