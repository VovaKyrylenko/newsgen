import { OutputAdapter } from '../../types'
import boxen from 'boxen'
import { cyan, yellow } from 'colorette'

export const tabloidConsoleOutput: OutputAdapter = {
  name: 'console',
  async run(payload: string): Promise<void> {
    const boxed = boxen(payload, {
      padding: 1,
      borderColor: 'red',
      borderStyle: 'double',
      title: '🧨 THE DAILY DRAMA',
      titleAlignment: 'center',
    })

    console.log(boxed)

    console.log(cyan(`\n🚨 Stay tuned — tomorrow’s headlines might just ruin brunch. 🍳`))

    console.log(yellow(`\n📢 Tip for readers: Never trust a quiet Tuesday.`))
  },
}
