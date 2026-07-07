# @enterwell/enum-helper

JavaScript enum helper for creating small enum-like objects that can be accessed by name, looked up by number or string value, and converted back to an array.

## Features

- Create an enum object from an array of enum definitions
- Access enum entries by their `name`
- Look up enum entries by their numeric or string `value`
- Return enum entries as an array with `toArray()`
- Preserve concrete TypeScript literal values for `value`, `name`, and `label`
- Publish both ESM and CommonJS builds

## Install

```sh
npm install @enterwell/enum-helper
```

or:

```sh
yarn add @enterwell/enum-helper
```

## Requirements

- Runtime enum values must be numbers or strings.
- Runtime enum names and labels must be strings.
- TypeScript consumers should use TypeScript 5 or newer so the package declarations can preserve literal values with `const` type parameters.

## Usage

```javascript
import Enum from '@enterwell/enum-helper';

const packagingData = [
  { value: 0, name: 'Small', label: 'Small size' },
  { value: 1, name: 'Large', label: 'Large size' }
];

const packagingEnum = new Enum(packagingData);

packagingEnum.Small.value; // 0
packagingEnum.Small.label; // 'Small size'
packagingEnum.Small; // { value: 0, name: 'Small', label: 'Small size' }

packagingEnum.get(0); // { value: 0, name: 'Small', label: 'Small size' }
packagingEnum.toArray(); // Same entries as packagingData
```

## API

### `new Enum(enumData)`

Creates an enum helper instance.

`enumData` must be an array of objects with this shape:

```typescript
{
  value: number | string;
  name: string;
  label: string;
}
```

Each `name` and `value` must be unique.

### Named entries

Each enum entry is assigned to the instance by its `name`.

```javascript
packagingEnum.Small; // { value: 0, name: 'Small', label: 'Small size' }
packagingEnum.Large; // { value: 1, name: 'Large', label: 'Large size' }
```

### `get(enumValue)`

Returns the enum entry for a numeric or string value.

```javascript
packagingEnum.get(1); // { value: 1, name: 'Large', label: 'Large size' }
```

Throws `ReferenceError('Enum object not found')` when no enum entry exists for the given value.

String values are supported too:

```javascript
const statusEnum = new Enum([
  { value: 'draft', name: 'Draft', label: 'Draft' },
  { value: 'published', name: 'Published', label: 'Published' }
]);

statusEnum.get('published'); // { value: 'published', name: 'Published', label: 'Published' }
```

### `toArray()`

Returns the enum entries as an array.

```javascript
packagingEnum.toArray();
// [
//   { value: 0, name: 'Small', label: 'Small size' },
//   { value: 1, name: 'Large', label: 'Large size' }
// ]
```

Numeric values do not need to be sequential:

```javascript
const statusEnum = new Enum([
  { value: 0, name: 'Draft', label: 'Draft' },
  { value: 10, name: 'Published', label: 'Published' }
]);

statusEnum.toArray().length; // 2
```

## Validation Errors

The constructor validates enum data and throws:

- `TypeError('Enum name have to be string value!')` when an entry name is not a string
- `TypeError('Enum value have to be number or string value!')` when an entry value is not a number or string
- `TypeError('Enum already contains an object with same name!')` when names are duplicated
- `TypeError('Enum already contains an object with same value!')` when values are duplicated

## TypeScript

The package preserves concrete enum data values in its types.

```typescript
import Enum from '@enterwell/enum-helper';

const packagingEnum = new Enum([
  { value: 0, name: 'Small', label: 'Small size' },
  { value: 1, name: 'Large', label: 'Large size' }
]);

packagingEnum.Small.value; // 0
packagingEnum.Small.name; // 'Small'
packagingEnum.Small.label; // 'Small size'
packagingEnum.get(1).value; // 1
packagingEnum.toArray()[0].value; // 0 | 1
```

When enum data is stored before calling `new Enum(...)`, use `as const` to keep literal values:

```typescript
const packagingData = [
  { value: 0, name: 'Small', label: 'Small size' },
  { value: 1, name: 'Large', label: 'Large size' }
] as const;

const packagingEnum = new Enum(packagingData);

packagingEnum.Large.value; // 1
```

### Exported Types

The package exports these TypeScript helper types:

- `EnumValue`
- `EnumDef`
- `EnumData`
- `EnumItem`
- `EnumByName`
- `EnumByValue`
- `EnumType`
- `EnumMethods`
- `EnumInstance`
- `Enum`
- `EnumConstructor`

Example:

```typescript
import Enum, { type Enum as EnumInstance } from '@enterwell/enum-helper';

const packagingData = [
  { value: 0, name: 'Small', label: 'Small size' },
  { value: 1, name: 'Large', label: 'Large size' }
] as const;

const packagingEnum: EnumInstance<typeof packagingData> = new Enum(packagingData);
```

## License

MIT (c) [Enterwell](http://enterwell.net)
