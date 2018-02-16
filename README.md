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
  .hasLettersLatin()
  .hasNumbers()
  .has("!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+");
// -->
{
  ok: true,
  base: 'Pa$$w0rd',
  asserts: ['hasLettersLatin', 'hasNumbers', 'has'],
  errors: []
}
```

```js
validate('bob')
  .hasLettersLatin()
  .hasNumbers();
// -->
{
  ok: false,
  base: 'bob',
  asserts: ['hasLettersLatin', 'hasNumbers'],
  errors: [
    {
      path: [],
      rule: 'hasNumbers',
      details: {
        string: 'bob',
        subStrings: [1,2,3,4,5,6,7,8,9],
        found: false,
        message: '"bob" has no numbers'
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

* [.has( subString [, subString2...] )](#has) - Check that any `subString` present in `base`.
* [.hasNo( pattern [, pattern2...] )](#hasno) - Check that `pattern` not present in `base`.
* [.match( regexp )](#match) - Check `base` for matching `regexp`.

### .has
Check that any `subString` present in `base`.

Syntax:
```js
.has( subString [, subString2...] )
```
Fail details:
```js
{
    string: base,
    subStrings: [subString, subString2...],
    found: false,
    message: 'not any of ["subString", "subString2"...] found in "base"'
}
```
Examples:
```js
validate('abc123').has('a').ok === true;
validate('abc123').has('c1','e4').ok === true;

validate('abc123').has('d').ok === false;
validate('abc123').has('e2','e4').errors[0].details -- {
    string: 'abc123',
    subStrings: ['e2','e4'],
    found: false,
    message: 'not any of ["e2", "e4"] found in "abc123"'
}
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

### .match
```js
.match( regexp )
```
Check `base` for matching `regexp`.

examples
```js
validate('abc123').match(/\d/).ok === true;
validate('abc123').match(/^a.*3$/).ok === true;

validate('abc123').match(/\s/).ok === false;
validate('abc123').match(/^d.*6$/).ok === false;
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
