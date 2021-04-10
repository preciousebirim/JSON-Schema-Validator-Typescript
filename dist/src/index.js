"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var HOT_GLOBAL;
(function (HOT_GLOBAL) {
    var JSONValidator = /** @class */ (function () {
        function JSONValidator(schemaFilePath) {
            this.schemaFilePath = schemaFilePath;
            this._schemaObject = null;
            this._jsonObject = null;
            this._getSchema();
        }
        JSONValidator.prototype._getSchema = function () {
            if (fs_1.default.existsSync(this.schemaFilePath)) {
                var json = fs_1.default.readFileSync(this.schemaFilePath, { encoding: 'utf-8' });
                if (json.trim().length > 0) {
                    try {
                        this._schemaObject = JSON.parse(json);
                    }
                    catch (e) {
                        throw new SchemaJSONInvalid('Schema JSON is Invalid');
                    }
                }
                else {
                    throw new SchemaEmptyExcepion('schema file contains nothing');
                }
            }
            else {
                throw new SchemaNotFoundExcepion('Path to schema file does not exists');
            }
        };
        JSONValidator.prototype._isDateTimeFormat = function (value) {
            if (!(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/.test(value))) {
                throw new FormatError(value + ' is an invalid date-time format');
            }
        };
        JSONValidator.prototype._isTimeFormat = function (value) {
            if (!(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value))) {
                throw new FormatError(value + ' is an invalid time format');
            }
        };
        JSONValidator.prototype._isDateFormat = function (value) {
            if (!(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(value))) {
                throw new FormatError(value + ' is an invalid time format');
            }
        };
        JSONValidator.prototype._isEmailFormat = function (value) {
            var pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            if (!(pattern.test(value))) {
                throw new FormatError(value + ' is an invalid email format');
            }
        };
        JSONValidator.prototype._isURIFormat = function (value) {
            var pattern = new RegExp('/^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/');
            if (!(pattern.test(value))) {
                throw new FormatError(value + ' is an invalid uri format');
            }
        };
        JSONValidator.prototype._isHostnameFormat = function (value) {
            var pattern = new RegExp('/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/');
            if (!(pattern.test(value))) {
                throw new FormatError(value + ' is an invalid hostname format');
            }
        };
        JSONValidator.prototype._isIPV4Format = function (value) {
            if (!(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(value))) {
                throw new FormatError(value + ' is an invalid ipv4 format');
            }
        };
        JSONValidator.prototype._isIPV6Format = function (value) {
            var pattern = new RegExp('/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/');
            if (!(pattern.test(value))) {
                throw new FormatError(value + ' is an invalid ipv6 format');
            }
        };
        JSONValidator.prototype._formatChecker = function (formatType, value) {
            switch (formatType) {
                case 'date-time':
                    this._isDateTimeFormat(value);
                    break;
                case 'time':
                    this._isTimeFormat(value);
                    break;
                case 'date':
                    this._isDateFormat(value);
                    break;
                case 'email':
                    this._isEmailFormat(value);
                    break;
                case 'idn-email':
                    this._isEmailFormat(value);
                    break;
                case 'uri':
                    this._isURIFormat(value);
                    break;
                case 'hostname':
                    this._isHostnameFormat(value);
                    break;
                case 'ipv4':
                    this._isIPV4Format(value);
                    break;
                case 'ipv6':
                    this._isIPV6Format(value);
                    break;
            }
        };
        JSONValidator.prototype._isString = function (value) {
            if (typeof value !== 'string') {
                throw new StringExpectedValidator('String Expected, Value provided is not string');
            }
        };
        JSONValidator.prototype._isInterger = function (value) {
            if (!Number.isInteger(value)) {
                throw new IntegerExpectedValidator('Integer Expected, Value provided is not integer');
            }
        };
        JSONValidator.prototype._isNumber = function (value) {
            if (Number.isNaN(value)) {
                throw new NumberExpectedValidator('Number Expected, Value provided is not number');
            }
        };
        JSONValidator.prototype._isObject = function (value, entitySchema) {
            if (typeof (value) !== 'object' || Array.isArray(value) == true) {
                throw new ObjectExpectedValidator('Object Expected, Value provided is not object');
            }
            else {
                var requiredKeys = entitySchema.required ? entitySchema.required : [];
                var availableKeys = [];
                for (var key in value) {
                    availableKeys.push(key);
                }
                for (var _i = 0, requiredKeys_1 = requiredKeys; _i < requiredKeys_1.length; _i++) {
                    var k = requiredKeys_1[_i];
                    if (!availableKeys.includes(k)) {
                        throw new MissingKeyError(k + " is required in " + JSON.stringify(value) + " JSON");
                    }
                }
                for (var key in value) {
                    var v = value[key];
                    for (var propKey in entitySchema.properties) {
                        var propValue = entitySchema.properties[propKey];
                        if (propKey === key) {
                            switch (propValue.type) {
                                case 'string':
                                    this._isString(v);
                                    break;
                                case 'integer':
                                    this._isInterger(v);
                                    break;
                                case 'number':
                                    this._isNumber(v);
                                    break;
                                case 'object':
                                    this._isObject(v, propValue);
                                    break;
                                case 'array':
                                    this._isArray(v, propValue);
                                    break;
                                case 'boolean':
                                    this._isBoolean(v);
                                    break;
                                case 'null':
                                    this._isNull(v);
                                    break;
                            }
                            if (propValue.format && typeof propValue.format === 'string') {
                                this._formatChecker(propValue.format, v);
                            }
                        }
                    }
                }
            }
        };
        JSONValidator.prototype._isBoolean = function (value) {
            if (typeof (value) !== 'boolean') {
                throw new BooleanExpectedValidator('Boolean Expected, Value provided is not boolean');
            }
        };
        JSONValidator.prototype._isArray = function (value, entitySchema) {
            if (!Array.isArray(value)) {
                throw new ArrayExpectedValidator('Array Expected, Value provided is not array');
            }
            else {
                var c = 0;
                for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                    var v = value_1[_i];
                    var schema = entitySchema.items[c];
                    switch (schema.type) {
                        case 'string':
                            this._isString(v);
                            break;
                        case 'integer':
                            this._isInterger(v);
                            break;
                        case 'number':
                            this._isNumber(v);
                            break;
                        case 'object':
                            this._isObject(v, schema);
                            break;
                        case 'array':
                            this._isArray(v, schema);
                            break;
                        case 'boolean':
                            this._isBoolean(v);
                            break;
                        case 'null':
                            this._isNull(v);
                            break;
                    }
                    c++;
                }
            }
        };
        JSONValidator.prototype._isNull = function (value) {
            if (value !== null) {
                throw new NullExpectedValidator('Null Expected, Value provided is not null');
            }
        };
        JSONValidator.prototype._validate = function (json) {
            if (this._schemaObject !== null) {
                try {
                    this._jsonObject = JSON.parse(json);
                }
                catch (e) {
                    throw new JSONInvalid('JSON is Invalid');
                }
                if (this._schemaObject.type === 'array') {
                    this._isArray(this._jsonObject, this._schemaObject);
                }
                else if (this._schemaObject.type === 'object') {
                    this._isObject(this._jsonObject, this._schemaObject);
                }
                else {
                    throw new SchemaJSONInvalidRootType('Schema root  must be of type array or object');
                }
            }
            return this._jsonObject;
        };
        return JSONValidator;
    }());
    HOT_GLOBAL.JSONValidator = JSONValidator;
    var SchemaNotFoundExcepion = /** @class */ (function (_super) {
        __extends(SchemaNotFoundExcepion, _super);
        function SchemaNotFoundExcepion() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SchemaNotFoundExcepion;
    }(Error));
    var SchemaEmptyExcepion = /** @class */ (function (_super) {
        __extends(SchemaEmptyExcepion, _super);
        function SchemaEmptyExcepion() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SchemaEmptyExcepion;
    }(Error));
    var SchemaJSONInvalid = /** @class */ (function (_super) {
        __extends(SchemaJSONInvalid, _super);
        function SchemaJSONInvalid() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SchemaJSONInvalid;
    }(Error));
    var SchemaJSONInvalidRootType = /** @class */ (function (_super) {
        __extends(SchemaJSONInvalidRootType, _super);
        function SchemaJSONInvalidRootType() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SchemaJSONInvalidRootType;
    }(Error));
    var JSONInvalid = /** @class */ (function (_super) {
        __extends(JSONInvalid, _super);
        function JSONInvalid() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return JSONInvalid;
    }(Error));
    var StringExpectedValidator = /** @class */ (function (_super) {
        __extends(StringExpectedValidator, _super);
        function StringExpectedValidator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StringExpectedValidator;
    }(Error));
    var IntegerExpectedValidator = /** @class */ (function (_super) {
        __extends(IntegerExpectedValidator, _super);
        function IntegerExpectedValidator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return IntegerExpectedValidator;
    }(Error));
    var NumberExpectedValidator = /** @class */ (function (_super) {
        __extends(NumberExpectedValidator, _super);
        function NumberExpectedValidator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return NumberExpectedValidator;
    }(Error));
    var BooleanExpectedValidator = /** @class */ (function (_super) {
        __extends(BooleanExpectedValidator, _super);
        function BooleanExpectedValidator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BooleanExpectedValidator;
    }(Error));
    var ArrayExpectedValidator = /** @class */ (function (_super) {
        __extends(ArrayExpectedValidator, _super);
        function ArrayExpectedValidator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ArrayExpectedValidator;
    }(Error));
    var ObjectExpectedValidator = /** @class */ (function (_super) {
        __extends(ObjectExpectedValidator, _super);
        function ObjectExpectedValidator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ObjectExpectedValidator;
    }(Error));
    var NullExpectedValidator = /** @class */ (function (_super) {
        __extends(NullExpectedValidator, _super);
        function NullExpectedValidator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return NullExpectedValidator;
    }(Error));
    var MissingKeyError = /** @class */ (function (_super) {
        __extends(MissingKeyError, _super);
        function MissingKeyError() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MissingKeyError;
    }(Error));
    var FormatError = /** @class */ (function (_super) {
        __extends(FormatError, _super);
        function FormatError() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return FormatError;
    }(Error));
})(HOT_GLOBAL || (HOT_GLOBAL = {}));
