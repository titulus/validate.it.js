validate.it
====

*Simple way to validate*

# Installation
```bash
npm install --save validate.it
```
```js
import validate from 'validate.it'
```

# Usage
Give him a string and call needed assertsments
```js
validate('Pa$$w0rd')
  .longerThan(5)
  .lessThan(100)
  .hasUpperCase()
  .hasLowerCase()
  .hasNumbers()
  .hasExtraChars();
// -->
{
  ok: true,
  base: 'Pa$$w0rd',
  asserts: ['longerThan', 'lessThan','hasUpperCase','hasLowerCase','hasNumbers','hasExtraChars'],
  errors: []
}
```

```js
validate('bob')
  .longerThan(5)
  .lessThan(100);
// -->
{
  ok: false,
  base: 'bob',
  asserts: ['longerThan', 'lessThan'],
  errors: [
    {
      path: [],
      rule: 'longerThan',
      details: {
        length: 4,
        min: 5,
        message: 'less than 5 chars'
      }
    }
  ]
}
```

# API

`validation` - is a function of single argument called `base`. It returns **result** described below. *Result* has methods called **asserts**, which returns mutated *result* - so you can call chains of asserts. Like
```js
result = validation( base )
  .assert()
  .anotherAssert( argument );
```
* **Assert** is a step of validation process. It checks `base` by specified rule.
* **Result** is a *result* of validation in clean readable format.

## Result
`result` is just a [DTO](https://en.wikipedia.org/wiki/Data_transfer_object) with params:
* `ok` *bool* - status of validation
  * `true` - validation passed
  * `false` - validation fails
* `base` *string|varios* - basis for validation
  * right now *validate.it* works only with simple sting bases. But if you know why and how to use it with other types of values - we can implement it.
* `asserts` *array* - called asserts names in call order
* `errors` *array* - [Validation Reports](#validation-report) for failed asserts

simpliest `result` you can get by calling `validation` without any assert
```js
validate('')
// -->
{
  ok: true,
  base: '',
  asserts: [],
  errors: []
}
```
### Validation Report
Idea by [@rumkin](https://github.com/rumkin). Default implementation in [Validation Report](https://github.com/rumkin/validation-report).
> Unified validation report interface

## Asserts

# Contribute
You know another usefull assert? Fill free to pull request here.
You can find assert template in `asserts/_template.js` + `test/asserts/template.test.js`. Use it for creating other.

When you are ready for pull request - make sure it has:
* **tests** with `case` block
* Description. (I will copy-paste it into API section of this doc)

In dev process use:
* `npm start` - build and watch for rebuild with [webpack](https://webpack.js.org)
* `npm test` - run tests with [mocha](https://mochajs.org/) and [chai](http://chaijs.com)
* `npm run tdd` - rerun tests on-change with [nodemon](https://nodemon.io)
