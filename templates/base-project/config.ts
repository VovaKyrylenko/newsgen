import { NewsgenConfig } from './types'
import { tabloidNewsInput } from './adapters/input/tabloid-news'
import { dramaticTitle } from './adapters/transform/dramatic-title'
import { tabloidConsoleOutput } from './adapters/output/console'
import { hypeify } from './adapters/transform/hypeify'

export const config: NewsgenConfig = {
  inputs: [tabloidNewsInput],
  transforms: [dramaticTitle, hypeify],
  outputs: [tabloidConsoleOutput],
}
