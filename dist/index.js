'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Representation of the enum.
 * 
 * @class Enum
 */
var Enum = function () {
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
    function Enum(enumData) {
        _classCallCheck(this, Enum);

        // defines the array
        this._array = [];

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


    _createClass(Enum, [{
        key: '_setEnumData',
        value: function _setEnumData(enumData) {
            // sets the enum data as properties
            enumData.forEach(function (singleEnum) {
                // Validate enum name - have to be string
                if (typeof singleEnum.name !== 'string') throw new TypeError('Enum name have to be string value!');

                // Validate enum value - have to be number    
                if (typeof singleEnum.value !== 'number') throw new TypeError('Enum value have to be an integer!');

                // If enum already contains object with same name
                if (this[singleEnum.name] !== undefined) throw new TypeError('Enum already contains an object with same name!');

                // sets the data as property
                this[singleEnum.name] = singleEnum;
            }, this);
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

    }, {
        key: '_setEnumDataToArray',
        value: function _setEnumDataToArray(enumData) {
            // iterates over the enum data
            enumData.forEach(function (singleEnum) {
                // Check if object with same value already exists
                if (this._array[singleEnum.value] !== undefined) throw new TypeError('Enum already contains an object with same value!');

                this._array[singleEnum.value] = singleEnum;
            }, this);
        }

        /**
         * Returns the enum data for the given enum value.
         * 
         * @param {number} enumValue - The value of the wanted enum.
         * 
         * @memberOf Enum
         */

    }, {
        key: 'get',
        value: function get(enumValue) {
            // Get enum object from array by value key
            var enumObject = this._array[enumValue];

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
         * 
         * @memberOf Enum
         */

    }, {
        key: 'toArray',
        value: function toArray() {
            // Copy array and return the copy
            return this._array.filter(function (e) {
                return e;
            });
        }
    }]);

    return Enum;
}();

// Export class


exports.default = Enum;