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
const omitBy = require('lodash.omitby')

// own
const utils = require('rollodeqc-gh-utils')

const getUser = function (username, store) {
  let opts
  if (store[username] && store[username].headers && store[username].headers.etag) {
    opts = { headers: { 'if-none-match': store[username].headers.etag } }
  }
  return ghGot('users/' + username, opts)
    .then((u) => {
      let o = utils.chosenFields(u.body)
      o.headers = utils.chosenHeaders(u.headers)
      o = omitBy(o, (d) => !d)
      store[username] = o
      return o
    })
    .catch((e) => e.statusCode === 304 ? store[username] : Promise.reject(e))
}

let limiter

module.exports = function (username, store) {
  if (typeof store !== 'object') { store = {} }
  if (limiter) { return limiter().then(() => getUser(username, store)) }
  return utils.rateLimit()
    .then((rl) => {
      const l2 = Math.ceil(5 * (1000 * rl.rate.reset - Date.now()) / rl.rate.remaining)
      limiter = module.exports.setLimiter(5, l2)
      return limiter().then(() => getUser(username, store))
    })
}

module.exports.clearLimiter = function () { limiter = null }

module.exports.setLimiter = function (c, t) {
  limiter = rateLimit(c, t)
  return limiter
}
