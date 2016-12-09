# label-class
Angular `label-class` directive

## Setup

#### Install via npm

```
npm install label-class --save
```

#### Define the directive on your app

```js
angular.module('yourApp', []).directive('labelClass', require('label-class'))
```

## Example

```js
<label label-class='{"is-disabled": ":disabled", "is-checked": ":checked"}'>
  <input ng-model="this.example" type="checkbox">
</label>
```

## Development

```
npm install
npm start
npm test
```
