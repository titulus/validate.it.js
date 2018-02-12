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
validate('bob!')
  .longerThan(5)
  .lessThan(100)
  .hasOnly('A-z\d');
// -->
{
  ok: false,
  base: 'bob!',
  asserts: ['longerThan', 'lessThan', 'hasOnly'],
  errors: [
    {
      path: [],
      rule: 'longerThan',
      details: {
        length: 4,
        min: 5,
        message: 'less than 5 chars'
      }
    },
    {
      path: [],
      rule: 'hasOnly',
      details: {
        expected: 'A-z\d',
        found: '!',
        position: 3,
        mesage: "unexpeted char '!' found at position: 4"
      }
    }
  ],
}
```

Of course if some assertment fails - `ok` will be `false` and `errors` will contain errors

# API
## Return
## Asserts

# Contribute
You know another usefull assert? Fill free to pull request here.
You can find assert template in `asserts/_template.js` + `test/asserts/template.test.js`. Use it for creating other.

When you are ready for pull request - make sure it has:
* **tests** with `case` block
* Description. (I will copy-paste it into API section of this doc)
