import { FormControl } from '@angular/forms';
import { FormFieldControl } from '../../components';

export class SMValidators {

    static MatchOther(otherControl: FormFieldControl) {

        let thisControl: FormFieldControl;

        return function matchOtherValidate(control: FormFieldControl) {

           
            if (!thisControl) {
                thisControl = control;
                if (!otherControl) {
                    throw new Error('matchOtherValidator(): other control is not found in parent group');
                }
                otherControl.valueChanges.subscribe(() => {
                    thisControl.updateValueAndValidity();
                });
            }

            if (!otherControl) {
                return null;
            }

            if (otherControl.value !== thisControl.value) {
                return {
                    match: true
                };
            }

            return null;
        };

    }

}
