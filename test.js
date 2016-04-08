/*eslint arrow-parens: [2, "as-needed"]*/
'use strict'
import test from 'ava'
import fn from './'

test('no init', async t => {
  const result = await fn('yannicklux')
  t.is(result.login, 'yannicklux')
})

test('init', async t => {
  fn.setLimiter(1, 30000)
  let result = await fn('yannicklux')
  t.is(result.login, 'yannicklux')
  result = await fn('YannickKatambo')
  t.is(result.login, 'YannickKatambo')
})

test('all', async t => {
  fn.setLimiter(1, 60000)
  const x = await Promise.all([fn('yannicklux'), fn('YannickKatambo')])
  t.is(x[0].login, 'yannicklux')
  t.is(x[1].login, 'YannickKatambo')
})
