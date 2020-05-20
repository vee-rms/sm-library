import { FormControl, ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';
import { SMValidators } from '../utils/sm.validator';

export interface FormField {
    label?: string;
    name?: string;
    readOnly?: boolean;
    required?: boolean;
    tooltip?: string;
    value?: string;
    maxLength?: number;
    maxOccurs?: number;
    minLength?: number;
    minOccurs?: number;
    onGui?: boolean;
    containerFields?: FormField[];
    codeList?: string;
    errors?: any[];
    regex?: string;
    dataType?: DataType;
}

export enum DataType {
    ALPHA = 'ALPHA',
    ALPHANUMERIC = 'ALPHANUMERIC',
    TEXT = 'TEXT',
    NUMERIC = 'NUMERIC',
    DECIMAL = 'DECIMAL'
}

export class FormFieldControl extends FormControl {

    protected _name: string;
    protected _minInputLength: number;
    protected _maxInputLength: number;
    protected _label: string;
    protected _tooltip: string;
    protected _value: string;
    protected _required: boolean;
    protected _show: boolean;
    protected _codeList: string;
    protected _fieldErrors: any[];
    protected _regex: string;
    protected _dataType: DataType;

    constructor(
        fieldData?: FormField,
        validator?: ValidatorFn | ValidatorFn[] | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {

        super('', validator, asyncValidator);

    
        if (!fieldData) {
            console.warn(`AbstractFormField: No field data`);
            return;
        }


        if (!fieldData.name) {
            console.warn('AbstractFormField: No key');
            return;
        }

        this._mapFieldData(fieldData);

    }


    protected _mapFieldData(fieldData: FormField) {

        this._name = fieldData.name;
        this._minInputLength = fieldData.minLength;
        this._maxInputLength = fieldData.maxLength;
        this._label = fieldData.label;
        this._tooltip = fieldData.tooltip;
        this._required = fieldData.required;
        this._show = fieldData['onGui'] !== undefined ? fieldData.onGui : true;
        this._codeList = fieldData.codeList;
        this._dataType = fieldData.dataType;

        this._regex = fieldData.regex;
        this.setReadOnly(fieldData.readOnly);
        this.setValue(fieldData.value);

      
        this.setRequired(this._required ? true : false);
        this.useMax(Number.isInteger(this._maxInputLength));
        this.useMin(Number.isInteger(this._minInputLength));
        this.useRegex(this._regex ? true : false);

     
        this._setErrors(fieldData.errors);

    }

    protected _setErrors(errors: any[]) {

        if (errors && errors.length > 0) {
            this._fieldErrors = errors;
        } else {
            this._fieldErrors = [];
        }
    }

    private _setValue(value) {

        if (value === 'true') {
            this.setValue(true);

        } else if (value === 'false') {
            this.setValue(false);

        } else {
            this.setValue(value);
        }

    }

   
    get required() {
        return this._required;
    }

    get readOnly() {
        return this.disabled;
    }

    get show() {
        return this._show;
    }

    get name() {
        return this._name;
    }

    get label() {
        return this._label;
    }

    get minInputLength() {
        return this._minInputLength;
    }

    get regex() {
        return this._regex;
    }

    get maxInputLength() {
        return this._maxInputLength;
    }

    get tooltip() {
        return this._tooltip;
    }

    get value() {
        return this._value;
    }

    set value(value: any) {
        this._value = value;
    }

    get codeList() {
        return this._codeList;
    }

    get fieldErrors() {
        return this._fieldErrors;
    }

    get dataType() {
        return this._dataType;
    }

   
    public setRequired(isRequired: boolean) {

        if (isRequired) {
            this._required = true;
            this._addValidator(Validators.required);
            this.updateValueAndValidity();
        } else {
            this._required = false;
            this._removeValidator(Validators.required);
            this.updateValueAndValidity();
        }

    }

    public useRegex(useRegex: boolean) {
        if (useRegex) {
            this._addValidator(Validators.pattern(this._regex));
            this.updateValueAndValidity();
        } else {
            this._removeValidator(Validators.pattern(this._regex));
            this.updateValueAndValidity();
        }
    }

    public useMin(useMin: boolean) {

        if (this._minInputLength < 1 || (this._minInputLength === 1 && this._maxInputLength === 1)) {
            return;
        }

        if (useMin) {
            this._addValidator(Validators.minLength(this._minInputLength));
            this.updateValueAndValidity();
        } else {
            this._removeValidator(Validators.minLength(this._minInputLength));
            this.updateValueAndValidity();
        }
    }

    public useMax(useMax: boolean) {

        if (this._minInputLength < 1 || (this._minInputLength === 1 && this._maxInputLength === 1)) {
            return;
        }

        if (useMax) {
            this._addValidator(Validators.maxLength(this._maxInputLength));
            this.updateValueAndValidity();
        } else {
            this._removeValidator(Validators.maxLength(this._maxInputLength));
            this.updateValueAndValidity();
        }
    }

    public setReadOnly(isReadOnly: boolean) {
        if (isReadOnly) {
            this.disable();
        } else {
            this.enable();
        }

        
        const stillRequired = this._required && !isReadOnly;
        this.setRequired(stillRequired);

    }

    public setShow(display: boolean) {
        this._show = display;
    }

    public setMatchValidator(controlToMatch: FormFieldControl) {

        if (!controlToMatch) {
            return;
        }

        this._addValidator(SMValidators.MatchOther(controlToMatch));
    }

    public addValidator(validator: ValidatorFn) {
        this._addValidator(validator);
    }

    public removeValidator(validator: ValidatorFn) {
        this._removeValidator(validator);
    }

 

    protected _addValidator(validator: ValidatorFn) {

      
        if (this._hasValidator(validator)) {
            return;
        }

        if (this.validator instanceof Array) {
            return this.validator.push(validator);

        } else {

            return this.validator = validator;
        }

    }

    protected _removeValidator(validator: ValidatorFn) {

        if (!this._hasValidator(validator)) {
            return;
        }

    
        if (this.validator instanceof Array) {
            this.setValidators(this.validator.filter(v => v !== validator));

        } else {
            return this.setValidators([]);
        }

    }

    protected _hasValidator(validator: ValidatorFn): boolean {

      
        if (!this.validator) {
            return false;
        }

     
        if (this.validator instanceof Array) {
            return this.validator.find(v => v === validator) !== undefined;

        } else {
            return this.validator === validator;
        }

    }

    setLogicalError() {

        let errors = this.errors;
        console.log(this.name + ' Before: ', errors);

        if (!errors) {
            errors = {};
        }

        errors.logical = true;

        console.log(this.name + ' After: ', errors);
        this.setErrors(errors);
    }

    clearLogicalError() {

        if (this.errors) {
            this.errors.logical = false;
            this.setErrors(this.errors);
        }
    }

    patchValue(fieldData: FormField) {

        this._setErrors(fieldData.errors);
    }

}
