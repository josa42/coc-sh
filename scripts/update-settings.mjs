#!/usr/bin/env node

import { promises as fs } from 'fs'

run()

async function run() {
  const { contributes } = await (await fetch('https://raw.githubusercontent.com/bash-lsp/bash-language-server/main/vscode-client/package.json')).json()
  const pkg = JSON.parse(await fs.readFile('package.json', 'utf-8'))

  const entries = [
    ...Object.entries(pkg.contributes.configuration.properties)
      .filter(([key]) => !key.startsWith("bashIde.")),
    ...Object.entries(contributes.configuration.properties)
  ]

  pkg.contributes.configuration.properties = Object.fromEntries(entries)

  fs.writeFile('package.json', JSON.stringify(pkg, null, '  ') + '\n')
}