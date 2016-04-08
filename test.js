/*eslint arrow-parens: [2, "as-needed"]*/
'use strict'
import test from 'ava'
import fn from './'

test.serial('no init', async t => {
  const result = await fn('yannicklux')
  t.is(result.login, 'yannicklux')
})

test.serial('init', async t => {
  fn.setLimiter(1, 5000)
  let result = await fn('yannicklux')
  t.is(result.login, 'yannicklux')
  fn.clearLimiter()
  result = await fn('YannickKatambo')
  t.is(result.login, 'YannickKatambo')
})

test.serial('all', async t => {
  fn.setLimiter(1, 2500)
  const x = await Promise.all([fn('yannicklux'), fn('YannickKatambo')])
  t.is(x[0].login, 'yannicklux')
  t.is(x[1].login, 'YannickKatambo')
})
