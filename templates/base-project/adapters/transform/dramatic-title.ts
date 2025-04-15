import { TransformAdapter } from '../../types'

export const dramaticTitle: TransformAdapter = {
  name: 'drama-queen',
  async run(input: string): Promise<string> {
    return `🧨 BREAKING MEWS 🧨\n\n${input}`
  },
}
