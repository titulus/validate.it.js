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
Give him a string and call needed asserts
```js
validate('Pa$$w0rd')
  .longerThan(5)
  .lessThan(100)
  .hasNumbers();
// -->
{
  ok: true,
  base: 'Pa$$w0rd',
  asserts: ['longerThan', 'lessThan', 'hasNumbers'],
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
> Note. All asserts combined in **AND** logic way. So if any of asserts fails - validation fails

* **Assert** is a step of validation process. It checks `base` by specified rule.
* **Result** is a *result* of validation in clean readable format.

## Result
`result` is just a [DTO](https://en.wikipedia.org/wiki/Data_transfer_object) with params:
* `ok` *bool* - status of validation
  * `true` - validation passed
  * `false` - validation fails
* `base` *string|varios* - basis for validation
  * right now *validate.it* works only with simple string bases. But if you know why and how to use it with other types of values - we can implement it.
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
> "Unified validation report interface" - [@rumkin](https://github.com/rumkin) / [Validation Report](https://github.com/rumkin/validation-report) . git

This is a DTO used as error objects in `errors` array. Every VR contains:
* `path` *array* - empty array `[]`
* `rule` *string* - name of assert
* `details` *object* - object with non-stardartized params describes reason of failure.
  * `details.message` *string* - enduser oriented error description.

Example
```js
{
  path: [],
  rule: 'longerThan',
  details: {
    length: 4,
    min: 5,
    message: 'less than 5 chars'
  }
}
```

## Asserts

* [.has( pattern )](#has) - Check that `pattern` present in `base`.
* [.hasNo( pattern )](#hasno) - Check that `pattern` not present in `base`.

### .has
```js
.has( pattern )
```
Check that `pattern` present in `base`.
* `pattern` - just regexp pattern. So you can use as pattern`'a'`, `'1'`, `'\\d'`, `[a-z]` etc.

examples
```js
validate('abc123').has('a').ok === true;
validate('abc123').has('c1').ok === true;
validate('abc123').has('\\d').ok === true;

validate('abc123').has('d').ok === false;
validate('abc123').has('a1').ok === false;
validate('abc123').has('\\s').ok === false;
```
### .hasNo
```js
.hasNo( pattern )
```
Check that `pattern` not present in `base`.
* `pattern` - just regexp pattern. So you can use as pattern`'a'`, `'1'`, `'\\d'`, `[a-z]` etc.

examples
```js
validate('abc123').hasNo('d').ok === true;
validate('abc123').hasNo('a1').ok === true;
validate('abc123').hasNo('\\s').ok === true;

validate('abc123').hasNo('a').ok === false;
validate('abc123').hasNo('c1').ok === false;
validate('abc123').hasNo('\\d').ok === false;
```

# Contribute
You know another usefull assert? Fill free to pull request here.
You can find assert template in [`asserts/_template.js`](https://github.com/titulus/validate.it/blob/master/asserts/_template.js) + [`test/asserts/template.test.js`](https://github.com/titulus/validate.it/blob/master/test/asserts/template.test.js). Use it for creating other.

When you are ready for pull request - make sure it has:
* **tests** with `ok` and `!ok` sections
* Description. (I will copy-paste it into API section of this doc)

In dev process use:
* `npm start` - build and watch for rebuild with [webpack](https://webpack.js.org)
* `npm test` - run tests with [mocha](https://mochajs.org/) and [chai](http://chaijs.com)
* `npm run tdd` - rerun tests on-change with [nodemon](https://nodemon.io)
