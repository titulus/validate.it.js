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
Give him a string and call needed assertsment
```js
validate('Pa$$w0rd')
  .longerThan(5)
  .hasUpperCase()
  .hasLowerCase()
  .hasNumbers()
  .hasExtraChars()
```
Assuming that all assertsment are right, it will return
```js
{
  ok: true,
  base: 'Pa$$w0rd',
  asserts: ['longerThan','hasUpperCase','hasLowerCase','hasNumbers','hasExtraChars'],
  errors: []
}
```
Of course if some assertment fails - `ok` will be `false` and `errors` will contain errors

# API
## Return
## Asserts

# Contribute
You know another usefull assert? Fill free to pull request here.
You can find assert template in `asserts/_template.js` + `test/template.js`. Use it for creating other.

When you are ready for pull request - make sure it has:
* **tests** with `case` block
* Description. (I will copy-paste it into API section of this doc)
