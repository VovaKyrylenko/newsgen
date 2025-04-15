export type NewsItem = {
  title: string
  content: string
  source?: string
  link?: string
}

export type InputAdapter = {
  name: string
  run(): Promise<NewsItem[]>
}

export type TransformAdapter = {
  name: string
  run(news: NewsItem[] | string): Promise<string>
}

export type OutputAdapter = {
  name: string
  run(payload: string): Promise<void>
}

export type NewsgenConfig = {
  inputs: InputAdapter[]
  transforms: TransformAdapter[]
  outputs: OutputAdapter[]
}
