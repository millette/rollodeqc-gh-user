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

test.skip('all', async t => {
  fn.setLimiter(1, 2500)
  const x = await Promise.all([fn('yannicklux'), fn('YannickKatambo')])
  t.is(x[0].login, 'yannicklux')
  t.is(x[1].login, 'YannickKatambo')
})

test.serial('store', async t => {
  const store = {
    Veronique: {
      login: 'Veronique',
      id: 221078,
      type: 'User',
      site_admin: false,
      name: 'Véronique Brossier',
      company: 'The New York Times',
      blog: 'http://www.v-ro.com',
      location: 'New York',
      email: 'veronique@v-ro.com',
      hireable: null,
      bio: null,
      public_repos: 0,
      public_gists: 0,
      followers: 6,
      following: 1,
      created_at: '2010-03-12T03:19:49Z',
      updated_at: '2016-03-30T12:05:32Z',
      headers: {
        server: 'GitHub.com',
        date: 'Wed, 06 Apr 2016 20:52:34 GMT',
        status: '200 OK',
        'x-ratelimit-limit': 5000,
        'x-ratelimit-remaining': 4692,
        'x-ratelimit-reset': 1459978980,
        etag: 'W/"95b59ee62d0f10ea9170a718ce2352ab"',
        timestamp: 1459975954,
        timestampDiff: 1.35,
        statusCode: 200
      }
    },
    vpthomp: {
      login: 'vpthomp',
      id: 491130,
      type: 'User',
      site_admin: false,
      name: 'Veronique',
      company: null,
      blog: null,
      location: null,
      email: null,
      hireable: null,
      bio: null,
      public_repos: 0,
      public_gists: 0,
      followers: 1,
      following: 0,
      created_at: '2010-11-21T23:47:03Z',
      updated_at: '2015-04-09T20:11:48Z',
      headers: {
        server: 'GitHub.com',
        date: 'Wed, 06 Apr 2016 20:52:35 GMT',
        status: '200 OK',
        'x-ratelimit-limit': 5000,
        'x-ratelimit-remaining': 4690,
        'x-ratelimit-reset': 1459978980,
        etag: 'W/"54d780b032ec3171583c13352a7dbc0a"',
        timestamp: 1459975955,
        timestampDiff: 2.32,
        statusCode: 200
      }
    }
  }

  const result = await fn('Veronique', store)
  t.is(result.login, 'Veronique')
})

test.serial('404', t => t.throwsAsync(fn('Vero666nique'), 'Response code 404 (Not Found)'))
