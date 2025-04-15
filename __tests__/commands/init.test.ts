import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'
import { runInit } from '../../commands/init'

vi.spyOn(process, 'exit').mockImplementation(((code?: number) => {
  throw new Error(`process.exit: ${code}`)
}) as never)

const testProjectName = 'unbelievable-news'
const projectPath = path.resolve(process.cwd(), testProjectName)
const pkgPath = path.join(projectPath, 'package.json')

beforeEach(() => {
  if (fs.existsSync(projectPath)) {
    fs.rmSync(projectPath, { recursive: true, force: true })
  }
})

afterEach(() => {
  if (fs.existsSync(projectPath)) {
    fs.rmSync(projectPath, { recursive: true, force: true })
  }
})

describe('init command', () => {
  it('✔ creates project and sets correct package name', async () => {
    process.argv = ['node', 'newsgen', 'init', testProjectName]

    await runInit()

    expect(fs.existsSync(projectPath)).toBe(true)

    const pkgRaw = fs.readFileSync(pkgPath, 'utf-8')
    const pkgJson = JSON.parse(pkgRaw)
    expect(pkgJson.name).toBe(testProjectName)
  })

  it('⨯ exits if project name is missing', async () => {
    process.argv = ['node', 'newsgen', 'init']

    await expect(runInit()).rejects.toThrow('process.exit: 1')
  })

  it('⨯ exits if folder already exists', async () => {
    fs.mkdirSync(projectPath, { recursive: true })
    process.argv = ['node', 'newsgen', 'init', testProjectName]

    await expect(runInit()).rejects.toThrow('process.exit: 1')
  })
})
