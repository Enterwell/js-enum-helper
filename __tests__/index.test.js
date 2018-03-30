import Enum from '../dist/index.js';

// Enum data
const packagingData = [
  { value: 0, name: 'Small', label: 'Small size' },
  { value: 1, name: 'Large', label: 'Large size' }
];

// Create packagingEnum object (enum representation)
const packagingEnum = new Enum(packagingData);

test("Should return initial array when calling .toArray() method", () => {
  expect(packagingEnum.toArray()).toContainEqual(packagingData[0]);
  expect(packagingEnum.toArray()).toContainEqual(packagingData[1]);
});

test("Should return correct value when accessing enum by name", () => {
  const packagingDataSmallValue = packagingData[0].value;

  expect(packagingEnum.Small.value).toBe(packagingDataSmallValue);
});

test("Should return correct enum object when calling .get(enumValue) method", () => {
  const packagingDataSmallValue = packagingData[0].value;

  expect(packagingEnum.get(packagingDataSmallValue)).toEqual(packagingData[0]);
});

test("Should throw when accessing Enum value that doesn't exist", () => {
  expect(() => {
    // Get enum with value that doesn't exist
    packagingEnum.get(-1);
  }).toThrow('Enum object not found');
});

test("Test enum with values that are not in sequence from 0..n", () => {
  // Create enum data
  const enumData = [
    { value: 0, name: 'Zero', label: 'Zero enum value' },
    { value: 1, name: 'One', label: 'One enum value' },
    { value: 100, name: 'Hundred', label: 'Hundred enum value' },
    { value: 1000, name: 'Thousand', label: 'Thousand enum value' },
  ];

  // Create test enum
  const testEnum = new Enum(enumData);

  // Compare array lengths
  expect(testEnum.toArray().length).toEqual(enumData.length);
});

test("Tries to create enum with invalid enum data", () => {
  expect(() => {
    // Tries to create enum with two same values
    new Enum([
      { value: 0, name: 'Zero', label: 'Zero enum value' },
      { value: 0, name: 'One', label: 'One enum value' }
    ]);
  }).toThrow('Enum already contains an object with same value!');

  expect(() => {
    // Tries to create enum with two same names
    new Enum([
      { value: 0, name: 'Zero', label: 'Zero enum value' },
      { value: 1, name: 'Zero', label: 'One enum value' }
    ]);
  }).toThrow('Enum already contains an object with same name!');

  expect(() => {
    // Tries to create enum with two same names
    new Enum([
      { value: 0, name: 'Zero', label: 'Zero enum value' },
      { value: 1, name: 1, label: 'One enum value' }
    ]);
  }).toThrow('Enum name have to be string value!');


  expect(() => {
    // Tries to create enum with two same names
    new Enum([
      { value: 0, name: 'Zero', label: 'Zero enum value' },
      { value: '1', name: 'One', label: 'One enum value' }
    ]);
  }).toThrow('Enum value have to be an integer!');

});