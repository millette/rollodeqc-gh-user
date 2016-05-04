#!/usr/bin/env node
0 > 1 // see https://github.com/babel/babel-eslint/issues/163

/*
RoLLodeQc utility to fetch a single GitHub user.

Copyright 2016 Robin Millette <robin@millette.info> (<http://robin.millette.info>)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the
[GNU Affero General Public License](LICENSE.md)
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict'

// npm
const meow = require('meow')
const omitBy = require('lodash.omitby')

// self
const rollodeqcGhUser = require('./')

const cli = meow([
  'Usage',
  '  $ rollodeqc-gh-user [input]',
  '',
  'Options',
  '  --foo  Lorem ipsum. [Default: false]',
  '',
  'Examples',
  '  $ rollodeqc-gh-user',
  '  unicorns & rainbows',
  '  $ rollodeqc-gh-user ponies',
  '  ponies & rainbows'
])

// console.log(rollodeqcGhUserEvents(cli.input[0] || 'unicorns'))

rollodeqcGhUser(cli.input[0] || 'unicorns')
  .then((x) => {
    const out = omitBy(x, (y) => !y)
    delete out.plan
    delete out.headers
    console.log(JSON.stringify(out, null, ' '))
  })
