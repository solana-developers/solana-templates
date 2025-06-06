import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

for (const directory of ['legacy', 'templates']) {
  createTemplateReadme(directory)
}

function createTemplateReadme(directory: string) {
  const templates: string[] = getDirectories(directory)
  const lines: string[] = []
  const title = getTitle(directory)
  console.log(`[${directory}] ${title}`)
  lines.push(`# ${title}`)
  lines.push('')

  for (const template of templates) {
    const templatePath = join(process.cwd(), template)
    const { description, name, keywords } = getTemplate(templatePath)
    lines.push(`## ${name}`)
    lines.push('')
    lines.push('> ' + description)
    lines.push('')
    lines.push(`Keywords: ${keywords.map((keyword) => '`' + keyword + '`').join(' ')}`)
    lines.push('')
    console.log(`[${directory}] -> ${name}`)
    console.log(`[${directory}] ->    ${description}`)
    console.log(`[${directory}] ->    [${keywords.join('|')}]`)
  }

  writeFileSync(join(process.cwd(), directory, 'README.md'), lines.join('\n'))
}

function getDirectories(directory: string): string[] {
  return readdirSync(directory)
    .map((file) => join(directory, file))
    .filter((file) => statSync(file).isDirectory())
}

function getTemplate(template: string): { description: string; name: string; keywords: string[] } {
  const packageJsonPath = join(template, 'package.json')
  if (!existsSync(packageJsonPath)) {
    throw new Error(`No package.json found at ${packageJsonPath}`)
  }
  const packageJson = readFileSync(packageJsonPath, 'utf-8')

  const { description, name, keywords } = JSON.parse(packageJson)

  return { description, name, keywords: keywords ?? [] }
}

function getTitle(directory: string): string {
  switch (directory) {
    case 'legacy':
      return 'Legacy Templates'
    case 'templates':
      return 'Templates'
    default:
      return directory.charAt(0).toUpperCase() + directory.slice(1)
  }
}
