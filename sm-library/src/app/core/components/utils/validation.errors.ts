import { DataType, FormFieldControl } from './../../components/form-controls/form-field-control';
import { FormControl } from '@angular/forms';
import { StringUtils } from './string.util';

const ERROR_MESSAGES = {
    ALPHA_MIN: 'alphaMinLengthErrMsg',
    ALPHA_MAX: 'alphaMaxLengthErrMsg',
    ALPHA_PATTERN: 'alphaPatternErrMsg',

    ALPHANUMERIC_MIN: 'alphaMinLengthErrMsg',
    ALPHANUMERIC_MAX: 'alphaMaxLengthErrMsg',
    ALPHANUMERIC_PATTERN: 'alphaPatternErrMsg',
    TEXT_PATTERN: 'alphaPatternTrueErrMsg',

    NUMERIC_MIN: 'numericMinLengthErrMsg',
    NUMERIC_MAX: 'numericMaxLengthErrMsg',
    NUMERIC_PATTERN: 'numericPatternErrMsg',

    DECIMAL_MIN: 'decimalMinLengthErrMsg',
    DECIMAL_MAX: 'decimalMaxLengthErrMsg',
    DECIMAL_PATTERN: 'decimalPatternErrMsg',

    GPSLATITUDE_PATTERN: 'gpsPatternLatitudeErrMsg',
    GPSLONGITUDE_PATTERN: 'gpsPatternLongitudeErrMsg'
};

const VALIDATION_ERRORS = {

    defaultMsg: 'Please add error message for {0}',
    email: 'Please enter a valid email address',
    minlength: 'Please enter at least {0} characters',
    maxlength: 'You have entered more than the maximum {0} characters',
    min: 'Please enter the minimum number of {0}',
    max: 'Please enter the maximum number of {0}',
    required: 'Field is mandatory',
    date: 'Please enter a valid date',
    pattern: 'Please ensure the entered information adheres to this pattern {0}',
    number: 'Please enter a valid number',
    url: 'Please enter a valid URL in the format of http(s)://www.google.com',
    alphaMinLengthErrMsg: 'Please enter at least {0} characters',
    alphaMaxLengthErrMsg: 'You have entered more than the maximum {0} characters',
    alphaPatternErrMsg: 'Please use characters and/special characters only',
    alphaPatternTrueErrMsg: 'Please use alphanumeric characters only (no spaces)',
    numericMinLengthErrMsg: 'Please enter at least {0} digits',
    numericMaxLengthErrMsg: 'You have entered more than the maximum {0} digits',
    numericPatternErrMsg: 'Please use digits only',
    mobileMinLengthErrMsg: 'Please enter at least {0} digits',
    mobileMaxLengthErrMsg: 'You have entered more than the maximum {0} digits',
    mobilePatternErrMsg: 'Please use digits only & starting with zero',
    decimalMinLengthErrMsg: 'Please enter at least {0} digits',
    decimalMaxLengthErrMsg: 'You have entered more than the maximum {0} digits',
    decimalPatternErrMsg: 'Please use decimal digits only',
    gpsPatternLatitudeErrMsg: 'Please enter valid Latitude coordinates',
    gpsPatternLongitudeErrMsg: 'Please enter valid Longitude coordinates',
    match: `{0}'s do not match`
};

export class ErrorHelper {

    static getErrorMessage(control: FormFieldControl) {

        const controlErrors = control.errors;

        if (!controlErrors) {
            return null;
        }

        const errors = [];

        Object.keys(controlErrors).map(function (error) {

            const errorMsg = VALIDATION_ERRORS[error];

            if (errorMsg) {

                switch (error) {

                    case 'required':
                        errors.push(errorMsg);
                        break;

                    case 'minlength':
                    case 'min':
                        errors.push(StringUtils.format(errorMsg, control.minInputLength));
                        break;

                    case 'maxlength':
                        errors.push(StringUtils.format(errorMsg, control.maxInputLength));
                        break;

                    case 'match':
                        errors.push(StringUtils.format(errorMsg, control.label));
                        break;

                    case 'pattern':
                        errors.push(StringUtils.format(errorMsg, control.regex));
                        break;

                    case 'email':
                        errors.push(errorMsg);
                        break;

                    default:
                        console.warn(`ErrorHelper: Could not format unknown error message [error=${error},msg=${errorMsg}`);
                        errors.push(errorMsg);

                }

            } else {

                console.error(`Unmapped error: ${error}`);
                errors.push(VALIDATION_ERRORS.defaultMsg);
            }

        });

        return errors;

    }

    private static getType(dataType: DataType) {

        switch (dataType) {

            case DataType.ALPHA:
                return 'alpha';

            case DataType.NUMERIC:
                return 'numeric';


        }


    }


}
