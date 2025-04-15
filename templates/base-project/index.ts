import { Engine } from './engine'
import { config } from './config'

const engine = new Engine(config.inputs, config.transforms, config.outputs)
engine.run()
