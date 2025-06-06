import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

interface PackageJson {
  description?: string
  keywords?: string[]
  name?: string
  templateGroups?: { description: string; directory: string; name: string }[]
}

interface TemplateGroup {
  description: string
  directory: string
  name: string
  templates: Template[]
}

interface Template {
  description: string
  keywords: string[]
  path: string
  name: string
}

generate()

function createTemplateReadme({ description, directory, name, templates }: TemplateGroup) {
  const tag = `[${directory}]`
  const targetDir = join(process.cwd(), directory)
  const lines: string[] = []

  console.log(`${tag} ${name}`)
  lines.push(`# ${name}\n`)
  lines.push(`${description}\n`)

  for (const template of templates) {
    const { description, name, keywords } = template
    lines.push(`### ${name}\n`)
    lines.push(`> ${description}\n`)
    lines.push(`${keywords.map((keyword) => '`' + keyword + '`').join(' ')}\n`)
    console.log(`${tag} -> ${name}`)
    console.log(`${tag} ->    ${description}`)
    console.log(`${tag} ->    [${keywords.join('|')}]`)
  }

  writeFileSync(join(targetDir, 'README.md'), lines.join('\n'))
}

function createTemplateJson(groups: TemplateGroup[]) {
  const res = groups.map(({ directory, templates }) => ({
    directory,
    templates: templates.map((template) => ({
      ...template,
      path: join(directory, template.name),
    })),
  }))

  const rootTemplatesJsonPath = join(process.cwd(), 'templates.json')
  writeFileSync(rootTemplatesJsonPath, JSON.stringify(groups, null, 2) + '\n')
}

function generate() {
  const groups = readTemplateGroups()
  for (const group of groups) {
    createTemplateReadme(group)
  }
  createTemplateJson(groups)
}

function getDirectories(directory: string): string[] {
  return readdirSync(directory)
    .map((file) => join(directory, file))
    .filter((file) => statSync(file).isDirectory())
}

function getTemplates(directory: string): Template[] {
  return getDirectories(directory).map((template) => getTemplate(template))
}

function getTemplate(template: string): Template {
  const packageJson = readPackageJson(template)

  const { description, name, keywords } = packageJson

  if (!description) {
    throw new Error(`No description found in package.json`)
  }

  if (!name) {
    throw new Error(`No name found in package.json`)
  }

  if (!keywords || keywords.length === 0) {
    throw new Error(`No keywords found in package.json`)
  }

  return { description, keywords, name, path: template }
}

function readTemplateGroups(): TemplateGroup[] {
  const packageJson = readPackageJson(process.cwd())
  const items = packageJson.templateGroups

  if (!items || items.length === 0) {
    throw new Error(`No templateGroups found in package.json`)
  }

  return items.map((group: { description: string; directory: string; name: string }) => {
    if (!group.description) {
      throw new Error(`No description found in group`)
    }
    if (!group.directory) {
      throw new Error(`No directory found in group`)
    }
    if (!group.name) {
      throw new Error(`No name found in group`)
    }

    return { ...group, templates: getTemplates(group.directory) }
  })
}

function readPackageJson(path: string): PackageJson {
  const packageJsonPath = join(path, 'package.json')
  if (!existsSync(packageJsonPath)) {
    throw new Error(`No package.json found at ${packageJsonPath}`)
  }
  const packageJson = readFileSync(packageJsonPath, 'utf-8')
  return JSON.parse(packageJson)
}
