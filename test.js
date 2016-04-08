/*eslint arrow-parens: [2, "as-needed"]*/
'use strict'
import test from 'ava'
import fn from './'

console.log('#1')

setInterval(function () {
  console.log('oh my')
}, 1000)

/*
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
*/

test('init', async t => {
  console.log('#2')
  fn.setLimiter(1, 10000)
  Promise.all([fn('yannicklux'), fn('YannickKatambo')])
    .then(x => {
      console.log('#3')
      console.log('XXX:', x.length)
      t.is(x[0].login, 'yannicklux')
      t.is(x[1].login, 'YannickKatambo')
    })
    .catch(e => {
      console.log('e:', e)
    })
})

console.log('#4')
