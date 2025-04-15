import { describe, it, expect, vi } from 'vitest'
import { Engine } from '../../templates/base-project/engine'
import type {
  InputAdapter,
  TransformAdapter,
  OutputAdapter,
  NewsItem,
} from '../../templates/base-project/types'

describe('Engine', () => {
  it('✔ processes input, transform, and output successfully', async () => {
    const news: NewsItem[] = [{ title: 'T1', content: 'Breaking' }]

    const input: InputAdapter = {
      name: 'input',
      run: vi.fn().mockResolvedValue(news),
    }

    const transform: TransformAdapter = {
      name: 'transform',
      run: vi.fn().mockImplementation(async input => {
        return input.toUpperCase()
      }),
    }

    const output: OutputAdapter = {
      name: 'output',
      run: vi.fn().mockResolvedValue(undefined),
    }

    const engine = new Engine([input], [transform], [output])
    await engine.run()

    expect(input.run).toHaveBeenCalled()
    expect(transform.run).toHaveBeenCalledWith('Breaking')
    expect(output.run).toHaveBeenCalledWith('BREAKING')
  })

  it('⚠ skips transform/output if no input results', async () => {
    const input: InputAdapter = {
      name: 'input',
      run: vi.fn().mockResolvedValue([]),
    }

    const transform: TransformAdapter = {
      name: 'transform',
      run: vi.fn(),
    }

    const output: OutputAdapter = {
      name: 'output',
      run: vi.fn(),
    }

    const engine = new Engine([input], [transform], [output])
    await engine.run()

    expect(input.run).toHaveBeenCalled()
    expect(transform.run).not.toHaveBeenCalled()
    expect(output.run).not.toHaveBeenCalled()
  })

  it('⨯ ignores failed input adapters', async () => {
    const successfulNews: NewsItem[] = [{ title: 'A', content: 'alpha' }]

    const inputOK: InputAdapter = {
      name: 'ok',
      run: vi.fn().mockResolvedValue(successfulNews),
    }

    const inputFail: InputAdapter = {
      name: 'fail',
      run: vi.fn().mockRejectedValue(new Error('fail')),
    }

    const transform: TransformAdapter = {
      name: 'transform',
      run: vi.fn().mockImplementation(async input => {
        return `+ ${input}`
      }),
    }

    const output: OutputAdapter = {
      name: 'output',
      run: vi.fn().mockResolvedValue(undefined),
    }

    const engine = new Engine([inputOK, inputFail], [transform], [output])
    await engine.run()

    expect(inputOK.run).toHaveBeenCalled()
    expect(inputFail.run).toHaveBeenCalled()
    expect(transform.run).toHaveBeenCalledWith('alpha')
    expect(output.run).toHaveBeenCalledWith('+ alpha')
  })
})
