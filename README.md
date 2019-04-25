# coc-sh

SH language server extension using [`bash-language-server`](https://github.com/mads-hartmann/bash-language-server)
for [`coc.nvim`](https://github.com/neoclide/coc.nvim).

## Install

In your vim/neovim, run command:

    :CocInstall coc-sh

## Features

See [`bash-language-server`](https://github.com/mads-hartmann/bash-language-server)

## Configuration options

- `sh.enable` set to `false` to disable language server.

Trigger completion in `coc-settings.json` to get complete list.

## Development

1. Run `yarn build` or `yarn build:watch`
2. Link extension

```sh
cd ~/github/coc-sh          && yarn link
cd ~/.config/coc/extensions && yarn link coc-sh
```

3. Add `"coc-sh": "*"` to dependencies in `~/.config/coc/extensions/package.json`

## License

[MIT © Josa Gesell](LICENSE)
