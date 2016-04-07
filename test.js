/*eslint arrow-parens: [2, "as-needed"]*/
'use strict'
import test from 'ava'
import fn from './'

test('init', async t => {
  fn().then(getUser => {
    getUser('yannicklux').then(result => {
      t.is(result, 'yannicklux')
    })
    getUser('YannickKatambo').then(result => {
      t.is(result.login, 'YannickKatambo')
    })
  })
})
