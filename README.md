# obento-cp
obento-cp executes the registered function at high speed without using the for statement.

## Installation
Yarn:
```bash
yarn add obento-cp
```

npm:
```
npm install --save obento-cp
```

## Example
```javascript
var cp = new require('obento-cp')();

var fc1 = function() {
  console.log('fc1');
}
var fc2 = function() {
  console.log('fc2');
}
cp.add(fc1);
cp.add(fc2);

cp.update();
// 'fc1'
// 'fc2'
```




