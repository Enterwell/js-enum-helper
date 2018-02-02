We use this *enum-helper* module to easier create and manipulate enums in JavaScript.

Features:
 - Create Enum object
 - Access Enum objects by value or by name
 - Return Enum array

## Install

```
$ npm install --save @enterwell/enum-helper
```
or with yarn
```
$ yarn add @enterwell/enum-helper
```


## Usage

```js
import Enum from '@enterwell/enum-helper';
```

## API

### Enum 

#### enumArray<enumObject>

Type: `array`

Array of enum objects.

#### enumObject

Type: `object`

Enum object. 
Has this shape: *{ value: Number, name: String, label: String }*

### get(enumValue)

Find Enum object by value and return it.

### enumValue

Type: `number`

Enum object value

## Code usage

```javascript
import Enum from '@enterwell/enum-helper';

// Enum data
const packagingData = [
  {value: 0, name: 'Small', label: 'Small size'},
  {value: 1, name: 'Large', label: 'Large size'}
];

// Create packagingEnum object (enum representation) from enum data
const packagingEnum = new Enum(packagingData);

// Get Enum value by name property
packagingEnum.Small.value; // 0
packagingEnum.Small.label; // 'Small size'

// Get Enum object by name property
packagingEnum.Small; // {value: 0, name: 'Small', label: 'Small size'}

// Get Enum object by enum value with .get method
packagingEnum.get(0); // {value: 0, name: 'Small', label: 'Small size'}

// Return original array with which Enum object was initalized
packagingEnum.toArray(); // The same as packagingData const 

// Get to not existing value throws an exception
packagingEnum.get(100); // ReferenceError ('Enum object not found');

```

## License

MIT © [Enterwell](http://enterwell.net)
