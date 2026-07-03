export type EnumValue = number;

export interface EnumDef<
    TValue extends EnumValue = EnumValue,
    TName extends string = string,
    TLabel extends string = string
> {
    name: TName,
    value: TValue,
    label: TLabel
}

export type EnumData = readonly EnumDef[];
export type EnumItem<TEnumData extends EnumData> = TEnumData[number];
export type EnumByName<TEnumData extends EnumData> = {
    [TEnum in EnumItem<TEnumData> as TEnum['name']]: TEnum;
};
export type EnumByValue<
    TEnumData extends EnumData,
    TValue extends EnumItem<TEnumData>['value']
> = Extract<EnumItem<TEnumData>, { value: TValue }>;
export type EnumType<TEnumData extends EnumData = EnumData> = EnumByName<TEnumData>;

export interface EnumMethods<TEnumData extends EnumData = EnumData> {
    _array: EnumItem<TEnumData>[];
    _setEnumData(enumData: TEnumData): void;
    _setEnumDataToArray(enumData: TEnumData): void;
    get<TValue extends EnumItem<TEnumData>['value']>(enumValue: TValue): EnumByValue<TEnumData, TValue>;
    get(enumValue: EnumValue): EnumItem<TEnumData>;
    toArray(): EnumItem<TEnumData>[];
}

export type EnumInstance<TEnumData extends EnumData = EnumData> = EnumMethods<TEnumData> & EnumType<TEnumData>;
export type Enum<TEnumData extends EnumData = EnumData> = EnumInstance<TEnumData>;

export interface EnumConstructor {
    new <const TEnumData extends EnumData>(enumData: TEnumData): EnumInstance<TEnumData>;
}

/**
 * Representation of the enum.
 * 
 * @class Enum
 */
class EnumImpl<const TEnumData extends EnumData = EnumData> implements EnumMethods<TEnumData> {
    _array: EnumItem<TEnumData>[] = [];

    /**
     * Creates an instance of Enum.
     * 
     * @param {Object[]} enumData - Info about the enum
     * @param {number} enumData[].value - Value for the enum
     * @param {string} enumData[].name - Name for the enum
     * @param {string} enumData[].label - Label for the enum
     * 
     * @memberOf Enum
     */
    constructor(enumData: TEnumData) {
        this._setEnumData = this._setEnumData.bind(this);
        this._setEnumDataToArray = this._setEnumDataToArray.bind(this);
        this.get = this.get.bind(this);
        this.toArray = this.toArray.bind(this);

        // sets the enum data to object
        this._setEnumData(enumData);

        // sets the enum data to array
        this._setEnumDataToArray(enumData);
    }

    /**
     * Sets the enum data into the main object.
     * 
     * @param {Object[]} enumData - Info about the enum
     * @param {number} enumData[].value - Value for the enum
     * @param {string} enumData[].name - Name for the enum
     * @param {string} enumData[].label - Label for the enum
     * 
     * @memberOf Enum
     */
    _setEnumData(enumData: TEnumData) {
        const enumObject = this as unknown as Record<string, EnumItem<TEnumData> | undefined>;

        // sets the enum data as properties
        enumData.forEach((singleEnum) => {
            // Validate enum name - have to be string
            if (typeof singleEnum.name !== 'string')
                throw new TypeError('Enum name have to be string value!');

            // Validate enum value - have to be number    
            if (typeof singleEnum.value !== 'number')
                throw new TypeError('Enum value have to be an integer!');

            // If enum already contains object with same name
            if (enumObject[singleEnum.name] !== undefined)
                throw new TypeError('Enum already contains an object with same name!');

            // sets the data as property
            enumObject[singleEnum.name] = singleEnum;
        });
    }

    /**
     * Sets the enum data to array.
     * 
     * @param {Object[]} enumData - Info about the enum
     * @param {number} enumData[].value - Value for the enum
     * @param {string} enumData[].name - Name for the enum
     * @param {string} enumData[].label - Label for the enum
     * 
     * @memberOf Enum
     */
    _setEnumDataToArray(enumData: TEnumData) {
        // iterates over the enum data
        enumData.forEach((singleEnum) => {
            // Check if object with same value already exists
            if (this._array[singleEnum.value] !== undefined)
                throw new TypeError('Enum already contains an object with same value!');

            this._array[singleEnum.value] = singleEnum;
        });
    }

    /**
     * Returns the enum data for the given enum value.
     * 
     * @param {number} enumValue - The value of the wanted enum.
     * 
     * @memberOf Enum
     */
    get<TValue extends EnumItem<TEnumData>['value']>(enumValue: TValue): EnumByValue<TEnumData, TValue>;
    get(enumValue: EnumValue): EnumItem<TEnumData>;
    get(enumValue: EnumValue) {
        // Get enum object from array by value key
        const enumObject = this._array[enumValue];

        // Check if enumObject is not found
        if (typeof enumObject === 'undefined') {
            // Throw error
            throw new ReferenceError('Enum object not found');
        }

        // returns the enum
        return enumObject;
    }

    /**
     * Returns the enum array
     * 
     * @memberOf Enum
     */
    toArray() {
        // Copy array and return the copy
        return this._array.filter((e): e is EnumItem<TEnumData> => Boolean(e));
    }
}

// Export class
const EnumConstructorValue = EnumImpl as EnumConstructor;

export default EnumConstructorValue;
