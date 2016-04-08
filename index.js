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
const ghGot = require('gh-got')
const rateLimit = require('rate-limit-promise')

// own
const utils = require('rollodeqc-gh-utils')

const getUser = function (username) {
  console.log(new Date(), username)
  return ghGot('users/' + username)
    .then((u) => {
      const o = utils.chosenFields(u.body)
      o.headers = utils.chosenHeaders(u.headers)
      return o
    })
}

let limiter

module.exports = function (username) {
  console.log(new Date(), 'calling')
  if (limiter) { return limiter().then(() => getUser(username)) }
/*
  return utils.rateLimit()
    .then((rl) => {
      console.log(new Date(), 'ratelimit')
      limiter = rateLimit(5, Math.ceil(5 * (1000 * rl.rate.reset - Date.now()) / rl.rate.remaining))
      return limiter().then(() => getUser(username))
    })
*/
}

module.exports.setLimiter = function (c, t) { limiter = rateLimit(c, t) }
module.exports.clearLimiter = function () { limiter = null }
