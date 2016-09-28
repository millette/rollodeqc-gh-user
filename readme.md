# rollodeqc-gh-user
[![Build Status](https://travis-ci.org/millette/rollodeqc-gh-user.svg?branch=master)](https://travis-ci.org/millette/rollodeqc-gh-user)
[![Coverage Status](https://coveralls.io/repos/github/millette/rollodeqc-gh-user/badge.svg?branch=master)](https://coveralls.io/github/millette/rollodeqc-gh-user?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/millette/rollodeqc-gh-user.svg)](https://gemnasium.com/github.com/millette/rollodeqc-gh-user)
> RoLLodeQc utility to fetch a single GitHub user.

## New since version 0.2.0
The cli now uses [update-notifier][] to let the user know about updates to this program.

Users have the ability to opt-out of the update notifier by changing
the optOut property to true in ~/.config/configstore/update-notifier-rollodeqc-gh-user-streak.json.
The path is available in notifier.config.path.

Users can also opt-out by setting the environment variable NO_UPDATE_NOTIFIER
with any value or by using the --no-update-notifier flag on a per run basis.

## Install
```
$ npm install --save rollodeqc-gh-user
```

## Usage
```js
const rollodeqcGhUser = require('rollodeqc-gh-user');

rollodeqcGhUser('unicorns');
//=> 'unicorns & rainbows'
```

## API
### rollodeqcGhUser(input, [options])
#### input
Type: `string`

Lorem ipsum.

#### options
##### foo
Type: `boolean`<br>
Default: `false`

Lorem ipsum.


## License
AGPL-v3 © [Robin Millette](http://robin.millette.info)

[update-notifier]: <https://github.com/yeoman/update-notifier>
