# coc-sh

SH language server extension using [`bash-language-server`](https://github.com/bash-lsp/bash-language-server)
for [`coc.nvim`](https://github.com/neoclide/coc.nvim).

## Install

In your vim/neovim, run command:

    :CocInstall coc-sh

## Features

See [`bash-language-server`](https://github.com/bash-lsp/bash-language-server)

## Configuration options

| Key                                    | Description                                                                                                                                                                                                                                                                                                                                                                        | Default                          |
|:---------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------|
| `sh.enable`                            |                                                                                                                                                                                                                                                                                                                                                                                    | `true`                           |
| `sh.commandPath`                       |                                                                                                                                                                                                                                                                                                                                                                                    |                                  |
| `bashIde.backgroundAnalysisMaxFiles`   | Maximum number of files to analyze in the background. Set to 0 to disable background analysis.                                                                                                                                                                                                                                                                                     | `500`                            |
| `bashIde.enableSourceErrorDiagnostics` | Enable diagnostics for source errors. Ignored if includeAllWorkspaceSymbols is true.                                                                                                                                                                                                                                                                                               |                                  |
| `bashIde.explainshellEndpoint`         | Configure explainshell server endpoint in order to get hover documentation on flags and options.                                                                                                                                                                                                                                                                                   |                                  |
| `bashIde.globPattern`                  | Glob pattern for finding and parsing shell script files in the workspace. Used by the background analysis features across files.                                                                                                                                                                                                                                                   | `**/*@(.sh|.inc|.bash|.command)` |
| `bashIde.includeAllWorkspaceSymbols`   | Controls how symbols (e.g. variables and functions) are included and used for completion, documentation, and renaming. If false (default and recommended), then we only include symbols from sourced files (i.e. using non dynamic statements like 'source file.sh' or '. file.sh' or following ShellCheck directives). If true, then all symbols from the workspace are included. |                                  |
| `bashIde.logLevel`                     | Controls the log level of the language server.                                                                                                                                                                                                                                                                                                                                     | `info`                           |
| `bashIde.shellcheckPath`               | Controls the executable used for ShellCheck linting information. An empty string will disable linting.                                                                                                                                                                                                                                                                             | `shellcheck`                     |
| `bashIde.shellcheckArguments`          | Additional ShellCheck arguments. Note that we already add the following arguments: --shell, --format, --external-sources.                                                                                                                                                                                                                                                          |                                  |

Trigger completion in `coc-settings.json` to get complete list.

## Development

1. Run `npm run build` or `npm run build:watch`
2. Link extension: `npm run link` / `npm run unlink`

## License

[MIT © Josa Gesell](LICENSE)
