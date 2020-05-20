import { Input, OnInit, Optional, Host, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective, NgForm, FormControl } from '@angular/forms';

import { FormFieldControl } from './form-field-control';
import { ErrorStateMatcher } from '@angular/material';
import { StringUtils } from '../utils';
import { ErrorHelper } from '../utils';

export class OnTouchErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

export abstract class AbstractFormField implements OnInit {

    REQUIRED_ERROR = 'Required';
    EMAIL_ERROR = 'Please enter a valid email address';
    DOES_NOT_MATCH = `'do not match`;
    REGEX_ERROR = 'Invalid value for regex'; 
    matcher = new OnTouchErrorStateMatcher();

    @Input()
    labelPrefix: string;

    @Input()
    control: FormFieldControl;

    @Input()
    name: string;

    @Input()
    get required() {
        return this._required;
    }
    set required(value: boolean) {
        if (this.control) {
            this.control.setRequired(value);
            
            value ? this.control.setRequired(true) : this.control.setRequired(false);
            value ? this.control.markAsTouched() : this.control.markAsUntouched();
        }
        this._required = value;
    }
    private _required = false;

    @Input()
    get readOnly() {
        return this._readOnly;
    }

    set readOnly(value: boolean) {

        if (this.control) {
            value ? this.control.disable() : this.control.enable();
        }

        this._readOnly = value;

    }
    private _readOnly = false;

    @Input()
    get hint() {
        return this._hint;
    }
    set hint(value: string) {
        this._hint = value;
    }
    private _hint: string;

    @Input()
    label: string;

    @Input()
    get show() {

        if (this._show === null) {
            return this.control ? this.control.show : true;
        }

        return this._show;
    }

    set show(value: any) {

        const boolValue = StringUtils.toBoolean(value);

        if (boolValue === undefined) {
            this._show = value;
            return;
        }

        this._show = boolValue;
    }


    private _show: boolean = null;

    constructor(@Optional() @Host() @SkipSelf() public controlContainer: ControlContainer) { }

    ngOnInit() {

        if (this.control) {
            return;
        }

        this.control = this.controlContainer.control.get(this.name) as FormFieldControl;
        this.control.setRequired(this.control ? this.control.required : this._required);
        this.readOnly = this._readOnly || this.control.readOnly;
    }

    resolveError() {

        const errors = ErrorHelper.getErrorMessage(this.control);

        if (!errors || errors.length < 1) {
            return '';
        }

        return errors[0];

    }

    get hasLogical() {

        return this.control.fieldErrors && this.control.fieldErrors.length > 0;

    }

    get logicalError() {

        if (this.hasLogical) {
            return this.control.fieldErrors[0].message;
        }

        return null;
    }

}
