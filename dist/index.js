"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Representation of the enum.
 * 
 * @class Enum
 */
var Enum = /*#__PURE__*/function () {
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

    _defineProperty(this, "_array", []);

    this._setEnumData = this._setEnumData.bind(this);
    this._setEnumDataToArray = this._setEnumDataToArray.bind(this);
    this.get = this.get.bind(this);
    this.toArray = this.toArray.bind(this); // sets the enum data to object

    this._setEnumData(enumData); // sets the enum data to array


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
    key: "_setEnumData",
    value: function _setEnumData(enumData) {
      var _this = this;

      // sets the enum data as properties
      enumData.forEach(function (singleEnum) {
        // Validate enum name - have to be string
        if (typeof singleEnum.name !== 'string') throw new TypeError('Enum name have to be string value!'); // Validate enum value - have to be number    

        if (typeof singleEnum.value !== 'number') throw new TypeError('Enum value have to be an integer!'); // If enum already contains object with same name

        if (_this[singleEnum.name] !== undefined) throw new TypeError('Enum already contains an object with same name!'); // sets the data as property

        _this[singleEnum.name] = singleEnum;
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

  }, {
    key: "_setEnumDataToArray",
    value: function _setEnumDataToArray(enumData) {
      var _this2 = this;

      // iterates over the enum data
      enumData.forEach(function (singleEnum) {
        // Check if object with same value already exists
        if (_this2._array[singleEnum.value] !== undefined) throw new TypeError('Enum already contains an object with same value!');
        _this2._array[singleEnum.value] = singleEnum;
      });
    }
    /**
     * Returns the enum data for the given enum value.
     * 
     * @param {number} enumValue - The value of the wanted enum.
     * 
     * @memberOf Enum
     */

  }, {
    key: "get",
    value: function get(enumValue) {
      // Get enum object from array by value key
      var enumObject = this._array[enumValue]; // Check if enumObject is not found

      if (typeof enumObject === 'undefined') {
        // Throw error
        throw new ReferenceError('Enum object not found');
      } // returns the enum


      return enumObject;
    }
    /**
     * Returns the enum array
     * 
     * @memberOf Enum
     */

  }, {
    key: "toArray",
    value: function toArray() {
      // Copy array and return the copy
      return this._array.filter(function (e) {
        return e;
      });
    }
  }]);

  return Enum;
}(); // Export class


var _default = Enum;
exports["default"] = _default;