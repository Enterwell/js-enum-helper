We use this *enum-helper* module to easier create and manipulate enums in JavaScript.

Features:
 - Create Enum object
 - Access Enum objects by value or by name
 - Return Enum array

## Install

```
$ npm install --save @enterwell/enum-helper
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
  {value: 0, name: 'Small', label: 'Malo pakiranje'},
  {value: 1, name: 'Big', label: 'Veliko pakiranje'}
];

// Create packagingEnum object (enum representation)
const packagingEnum = new Enum(packagingData);

// Get Enum value by name property
packagingEnum.Small.value; // 0

// Get Enum object by name property
packagingEnum.Small; // {value: 0, name: 'Small', label: 'Malo pakiranje'}

// Get Enum object by name with .get method
packagingEnum.get('Small'); // {value: 0, name: 'Small', label: 'Malo pakiranje'}

// Return original array with which Enum object was initalized
packagingEnum.toArray(); // The same as packagingData const 

```

## License

MIT © [Enterwell](http://enterwell.net)
