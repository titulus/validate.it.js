You can find assert template in [`asserts/_template.js`](https://github.com/titulus/validate.it/blob/master/asserts/_template.js) + [`test/asserts/template.test.js`](https://github.com/titulus/validate.it/blob/master/test/asserts/template.test.js). Use it for creating other.

When you are ready for pull request - make sure it has:
* **tests** with `ok`, `!ok`, and `returned` sections
* Description. (I will copy-paste it into API section of this doc)

In dev process use:
* `npm start` - build and watch for rebuild with [webpack](https://webpack.js.org)
* `npm test` - run tests with [mocha](https://mochajs.org/) and [chai](http://chaijs.com)
* `npm run tdd` - rerun tests on-change with [nodemon](https://nodemon.io)
