#!/usr/bin/env node

import https from 'https'
import { promises as fs } from 'fs'

run()

const keepKeys = ['sh.enable', 'sh.commandPath']

async function run() {
  const { contributes } = JSON.parse(await get('https://raw.githubusercontent.com/bash-lsp/bash-language-server/main/vscode-client/package.json'))
  const pkg = JSON.parse(await fs.readFile('package.json', 'utf-8'))

  const entries = [
    ...Object.entries(pkg.contributes.configuration.properties)
      .filter(([key]) => !key.startsWith("bashIde.")),
    ...Object.entries(contributes.configuration.properties)
  ]

  pkg.contributes.configuration.properties = Object.fromEntries(entries)

  fs.writeFile('package.json', JSON.stringify(pkg, null, '  ') + '\n')
}

async function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (resp) => {
        let data = ""

        resp.on("data", (chunk) => (data += chunk))
        resp.on("end", () => resolve(data))
      })
      .on("error", (err) => reject(err))
  })
}
