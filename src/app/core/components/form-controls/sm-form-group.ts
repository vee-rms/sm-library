import { AbstractControl, ValidatorFn } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { FormFieldControl } from './form-field-control';


export class SmFormGroup extends FormGroup {

    key: string;
    dir: string;
    config: any = {};

    constructor(
        options: {
            key?: string,
            dir?: string,
        } = {},
        controls: {
            [key: string]: AbstractControl;
        }) {

        super(controls);

        if (!options) {
            return;
        }

        this.key = options.key || '';
        this.dir = options.dir || '';

    }


    setValidator(validator: ValidatorFn) {

        if (this.isValidator(validator)) {
            return;
        }

        if (this.validator instanceof Array) {
            return this.validator.push(validator);
        } else {
            return this.validator = validator;
        }

    }

    isValidator(validator: ValidatorFn): boolean {

        if (!this.validator) {
            return false;
        }

        if (this.validator instanceof Array) {
            return this.validator.find(v => v === validator) !== undefined;
        } else {
            return this.validator === validator;
        }

    }

    removeValidator(validator: ValidatorFn) {

        if (!this.isValidator(validator)) {
            return;
        }

        if (this.validator instanceof Array) {
            this.setValidators(this.validator.filter(v => v !== validator));
        } else {
            this.setValidators([]);
        }
    }

    addFormFieldControl(control: FormFieldControl) {
        this.addControl(control.name, control);
    }

    addFormGroup(group: SmFormGroup) {
        this.addControl(group.key, group);
    }

}
