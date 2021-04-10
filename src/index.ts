import fs from 'fs';

namespace HOT_GLOBAL {
    export class JSONValidator {
        private _schemaObject: any | null = null;
        private _jsonObject: any | object[] | null = null;



        constructor(private readonly schemaFilePath: string) {
            this._getSchema();
        }

        private _getSchema() {
            if (fs.existsSync(this.schemaFilePath)) {
                const json = fs.readFileSync(this.schemaFilePath, { encoding: 'utf-8' });
                if (json.trim().length > 0) {
                    try {
                        this._schemaObject = JSON.parse(json);
                    } catch (e) {
                        throw new SchemaJSONInvalid('Schema JSON is Invalid');
                    }
                } else {
                    throw new SchemaEmptyExcepion('schema file contains nothing');
                }
            } else {
                throw new SchemaNotFoundExcepion('Path to schema file does not exists');
            }
        }

        private _isDateTimeFormat(value: string) {
            if (!(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/.test(value))) {
                throw new FormatError(value + ' is an invalid date-time format');
            }
        }

        private _isTimeFormat(value: string) {
            if (!(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value))) {
                throw new FormatError(value + ' is an invalid time format');
            }
        }

        private _isDateFormat(value: string) {
            if (!(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(value))) {
                throw new FormatError(value + ' is an invalid time format');
            }
        }

        private _isEmailFormat(value: string) {
            const pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            if (!(pattern.test(value))) {
                throw new FormatError(value + ' is an invalid email format');
            }
        }

        private _isURIFormat(value: string) {
            const pattern = new RegExp('/^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/');
            if (!(pattern.test(value))) {
                throw new FormatError(value + ' is an invalid uri format');
            }
        }

        private _isHostnameFormat(value: string) {
            const pattern = new RegExp('/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/');
            if (!(pattern.test(value))) {
                throw new FormatError(value + ' is an invalid hostname format');
            }
        }

        private _isIPV4Format(value: string) {
            if (!(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(value))) {
                throw new FormatError(value + ' is an invalid ipv4 format');
            }
        }

        private _isIPV6Format(value: string) {
            const pattern = new RegExp('/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/');
            if (!(pattern.test(value))) {
                throw new FormatError(value + ' is an invalid ipv6 format');
            }
        }


        private _formatChecker(formatType: string, value: string) {
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
        }

        private _isString(value: string) {
            if (typeof value !== 'string') {
                throw new StringExpectedValidator('String Expected, Value provided is not string');
            }
        }

        private _isInterger(value: number) {
            if (!Number.isInteger(value)) {
                throw new IntegerExpectedValidator('Integer Expected, Value provided is not integer');
            }
        }

        private _isNumber(value: number) {
            if (Number.isNaN(value)) {
                throw new NumberExpectedValidator('Number Expected, Value provided is not number');
            }
        }

        private _isObject(value: any, entitySchema: any) {
            if (typeof (value) !== 'object' || Array.isArray(value) == true) {
                throw new ObjectExpectedValidator('Object Expected, Value provided is not object');
            } else {
                const requiredKeys = entitySchema.required ? entitySchema.required as Array<string> : [];
                const availableKeys = [];

                for (const key in value) {
                    availableKeys.push(key);
                }

                for (const k of requiredKeys) {
                    if (!availableKeys.includes(k)) {
                        throw new MissingKeyError(`${k} is required in ${JSON.stringify(value)} JSON`);
                    }
                }

                for (const key in value) {
                    const v = value[key];

                    for (const propKey in entitySchema.properties) {
                        const propValue = entitySchema.properties[propKey];
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
        }

        private _isBoolean(value: boolean) {
            if (typeof (value) !== 'boolean') {
                throw new BooleanExpectedValidator('Boolean Expected, Value provided is not boolean');
            }
        }

        private _isArray(value: any[], entitySchema: any) {
            if (!Array.isArray(value)) {
                throw new ArrayExpectedValidator('Array Expected, Value provided is not array');
            } else {
                let c = 0;
                for (let v of value) {
                    const schema = entitySchema.items[c];

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
        }

        private _isNull(value: null) {
            if (value !== null) {
                throw new NullExpectedValidator('Null Expected, Value provided is not null');
            }
        }

        public _validate(json: string) {
            if (this._schemaObject !== null) {

                try {
                    this._jsonObject = JSON.parse(json);
                } catch (e) {
                    throw new JSONInvalid('JSON is Invalid');
                }


                if (this._schemaObject.type === 'array') {
                    this._isArray(this._jsonObject, this._schemaObject);
                } else if (this._schemaObject.type === 'object') {
                    this._isObject(this._jsonObject, this._schemaObject);
                } else {
                    throw new SchemaJSONInvalidRootType('Schema root  must be of type array or object');
                }
            }
            return this._jsonObject;
        }

    }

    class SchemaNotFoundExcepion extends Error {
    }
    class SchemaEmptyExcepion extends Error {
    }
    class SchemaJSONInvalid extends Error {
    }
    class SchemaJSONInvalidRootType extends Error {
    }
    class JSONInvalid extends Error {
    }
    class StringExpectedValidator extends Error {
    }
    class IntegerExpectedValidator extends Error {
    }
    class NumberExpectedValidator extends Error {
    }
    class BooleanExpectedValidator extends Error {
    }
    class ArrayExpectedValidator extends Error {
    }
    class ObjectExpectedValidator extends Error {
    }
    class NullExpectedValidator extends Error {
    }
    class MissingKeyError extends Error {
    }
    class FormatError extends Error {
    }

}
