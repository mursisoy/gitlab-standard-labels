#!/usr/bin/env node

const { die, parseArgs } = require('./console/utilities')
const { actions, defaultActionKey, parseUserAction } = require('./console/actions')
const argv = parseArgs(process.argv.slice(2))

const main = async (input = argv) => {
  const action = parseUserAction(input, defaultActionKey)
  const requestedAction = actions[action]

  if (typeof requestedAction === 'undefined') return die('Not a valid action')

  try {
    const message = await requestedAction(input._, input.delete || input.d)
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

main()
