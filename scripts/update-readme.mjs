#!/usr/bin/env node

import { promises as fs } from 'fs'

run()

async function run() {
  const pkg = JSON.parse(await fs.readFile('package.json', 'utf-8'))

  const rows = Object.entries(pkg.contributes.configuration.properties)
    .map(([key, { description, default: def }]) => [`\`${key}\``, description ?? '', def ? `\`${def}\`` : ''])

  const len = rows.reduce(([a1, b1, c1], [a2, b2, c2]) => {
    return [
      Math.max(a1, a2.length),
      Math.max(b1, b2?.length ?? 0),
      Math.max(c1, c2.length),
    ]
  }, [0, 0, 0])

  const c = (col, i, char = ' ') => col + char.repeat(len[i] - col.length)
  const r = (cols) => `| ${cols.map((col, i) => c(col, i)).join(' | ')} |`


  const tbl = [
    r(['Key', 'Description', 'Default']),
    '|' + [
      `:${c('', 0, '-')}-`,
      `:${c('', 1, '-')}-`,
      `:${c('', 2, '-')}-`,
    ].join('|') + '|',
    ...rows.map(r)
  ]

  let insection = false
  let intable = false

  const readme = (await fs.readFile('README.md', 'utf-8'))
    .split(/\n/)
    .reduce((lines, line) => {

      if (insection) {
        if (line.startsWith('|')) {
          intable = true
          return lines
        } else if (!intable || !line) {
          return lines
        } else {
          intable = false
          insection = false
        }
      }

      if (line === '## Configuration options') {
        insection = true
        return [
          ...lines,
          line,
          '',
          ...tbl,
          '',
        ]
      }

      return [
        ...lines,
        line,
      ]
    }, [])

  await fs.writeFile('README.md', readme.join('\n'))
}
