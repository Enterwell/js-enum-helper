import Enum from './index';

type Equal<TActual, TExpected> = (
    <TValue>() => TValue extends TActual ? 1 : 2
) extends (
    <TValue>() => TValue extends TExpected ? 1 : 2
) ? true : false;
type Expect<TValue extends true> = TValue;

const packagingEnum = new Enum([
    { value: 0, name: 'Small', label: 'Small size' },
    { value: 1, name: 'Large', label: 'Large size' }
]);

const largePackaging = packagingEnum.get(1);
const packagingArray = packagingEnum.toArray();

type InlineValue = Expect<Equal<typeof packagingEnum.Small.value, 0>>;
type InlineName = Expect<Equal<typeof packagingEnum.Small.name, 'Small'>>;
type InlineLabel = Expect<Equal<typeof packagingEnum.Small.label, 'Small size'>>;
type GetValue = Expect<Equal<typeof largePackaging.value, 1>>;
type ArrayValue = Expect<Equal<typeof packagingArray[number]['value'], 0 | 1>>;

const statusEnum = new Enum([
    { value: 'draft', name: 'Draft', label: 'Draft' },
    { value: 'published', name: 'Published', label: 'Published' }
]);

const publishedStatus = statusEnum.get('published');
const statusArray = statusEnum.toArray();

type StringInlineValue = Expect<Equal<typeof statusEnum.Draft.value, 'draft'>>;
type StringGetValue = Expect<Equal<typeof publishedStatus.value, 'published'>>;
type StringArrayValue = Expect<Equal<typeof statusArray[number]['value'], 'draft' | 'published'>>;

const storedEnumData = [
    { value: 2, name: 'Medium', label: 'Medium size' },
    { value: 3, name: 'Huge', label: 'Huge size' }
] as const;

const storedEnum = new Enum(storedEnumData);

type StoredValue = Expect<Equal<typeof storedEnum.Huge.value, 3>>;
type StoredName = Expect<Equal<typeof storedEnum.Huge.name, 'Huge'>>;
type StoredLabel = Expect<Equal<typeof storedEnum.Huge.label, 'Huge size'>>;
