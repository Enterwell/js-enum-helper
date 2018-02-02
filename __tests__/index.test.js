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