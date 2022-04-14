export interface EnumType {
    [key: string]: EnumDef | undefined;
}

export interface EnumDef {
    name: string,
    value: number,
    label: string
}

/**
 * Representation of the enum.
 * 
 * @class Enum
 */
class Enum {
    [key: string]: EnumDef | undefined | ((enumValue: number) => EnumDef) | (() => EnumDef[]) | ((enumData: EnumDef[]) => void) | EnumDef[];
    
    _array: EnumDef[] = [];

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
    constructor(enumData: EnumDef[]) {
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
    _setEnumData(enumData: EnumDef[]) {
        // sets the enum data as properties
        enumData.forEach((singleEnum) => {
            // Validate enum name - have to be string
            if (typeof singleEnum.name !== 'string')
                throw new TypeError('Enum name have to be string value!');

            // Validate enum value - have to be number    
            if (typeof singleEnum.value !== 'number')
                throw new TypeError('Enum value have to be an integer!');

            // If enum already contains object with same name
            if (this[singleEnum.name] !== undefined)
                throw new TypeError('Enum already contains an object with same name!');

            // sets the data as property
            this[singleEnum.name] = singleEnum;
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
    _setEnumDataToArray(enumData: EnumDef[]) {
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
    get(enumValue: number) {
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
        return this._array.filter(e => e);
    }
}

// Export class
export default Enum;