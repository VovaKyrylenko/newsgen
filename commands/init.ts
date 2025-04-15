import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join, resolve } from 'path'
import { white, gray, yellow, cyan } from 'colorette'
import ora from 'ora'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function runInit() {
  const args = process.argv.slice(3)
  const projectName = args[0]
  const spinner = ora(gray('Creating project...')).start()
  if (!projectName) {
    const errorMessage = `newsgen init my-news-bot`
    spinner.fail(`Project name required. Example: ${cyan(errorMessage)}`)
    process.exit(1)
  }

  const projectPath = resolve(process.cwd(), projectName)
  const templatePath = join(__dirname, '../templates/base-project')

  if (existsSync(projectPath)) {
    spinner.fail(`Folder already exists: ${yellow(projectName)}`)
    process.exit(1)
  }

  try {
    mkdirSync(projectPath, { recursive: true })
    cpSync(templatePath, projectPath, { recursive: true })

    const pkgPath = join(projectPath, 'package.json')
    if (existsSync(pkgPath)) {
      const raw = readFileSync(pkgPath, 'utf8')
      const json = JSON.parse(raw)
      json.name = projectName.trim().toLowerCase().replace(/\s+/g, '-')
      writeFileSync(pkgPath, JSON.stringify(json, null, 2))
    }

    const projectPathDisplay = `./${projectName}`
    spinner.succeed(`Project created: ${white(projectPathDisplay)}`)

    const launchCommand = `cd ${projectName} && npm run dev`
    spinner.info(`Launch: ${cyan(launchCommand)}`)
  } catch (err) {
    spinner.fail(`Failed to create project`)
    console.error(err)
    process.exit(1)
  }
}
