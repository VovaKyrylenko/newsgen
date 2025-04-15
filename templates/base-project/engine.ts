import { NewsItem, InputAdapter, TransformAdapter, OutputAdapter } from './types'
import chalk from 'chalk'

export class Engine {
  constructor(
    private readonly inputs: InputAdapter[],
    private readonly transforms: TransformAdapter[],
    private readonly outputs: OutputAdapter[]
  ) {}

  async run(): Promise<void> {
    console.log(chalk.gray('ℹ engine started'))

    const inputResults = await Promise.allSettled(this.inputs.map(adapter => adapter.run()))

    const news: NewsItem[] = inputResults
      .filter(
        (result): result is PromiseFulfilledResult<NewsItem[]> => result.status === 'fulfilled'
      )
      .flatMap(result => result.value)

    if (news.length === 0) {
      console.log(chalk.yellow('⚠ no news found'))
      return
    }

    let transformed = news.map(item => item.content).join('\n\n')

    for (const transform of this.transforms) {
      transformed = await transform.run(transformed)
    }

    await Promise.allSettled(this.outputs.map(adapter => adapter.run(transformed)))

    console.log(chalk.green('✔ engine finished'))
  }
}
