#!/usr/bin/env node

import { argv } from 'process'
import { runInit } from '../commands/init'

const command = argv[2]

if (command === 'init') {
  await runInit()
} else {
  console.log(`❌ Unknown command: ${command}`)
  console.log(`🛠️ Available: init`)
}
