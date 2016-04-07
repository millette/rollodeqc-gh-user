/*eslint arrow-parens: [2, "as-needed"]*/
'use strict'
import test from 'ava'
import fn from './'

test('no init', async t => {
  const result = await fn('yannicklux')
  // console.log('result:', result)
  t.is(result.login, 'yannicklux')
})

test('init', async t => {
  fn.setLimiter(1, 15000)
  let result = await fn('yannicklux')
  t.is(result.login, 'yannicklux')
  result = await fn('YannickKatambo')
  // console.log('result:', result)
  t.is(result.login, 'YannickKatambo')
})
