import { TransformAdapter } from '../../types'

export const hypeify: TransformAdapter = {
  name: 'hypeify',
  async run(input: string): Promise<string> {
    return input
      .replace(/\b(investigation|report|news|story)\b/gi, '🔥 EXCLUSIVE $1 🔥')
      .replace(/\b(discover(ed)?|find(s|ing)?)\b/gi, '😱 UNCOVERED')
      .replace(/\b(experts?)\b/gi, '👨‍🔬 LEADING $1')
      .replace(/\b(woman|man|child|cat|dog)\b/gi, '🧍 A MYSTERIOUS $1')
      .replace(/\b(secret|hidden|unknown|lost)\b/gi, '🚨 $1 AND DANGEROUS!')
      .replace(/\b([A-Z][a-z]+)\b/g, word => word.toUpperCase()) // CAPITALIZE everything "title-like"
  },
}
