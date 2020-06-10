import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function equalValidator(test): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        // const forbidden = nameRe.test(control.value);
        console.log(test);
        return null;
        // return forbidden ? { 'forbiddenName': { value: control.value } } : null;
    };
}

@Directive({
    selector: '[equalPWD]',
    providers: [{ provide: NG_VALIDATORS, useExisting: EqualPWDDirective, multi: true }]
})
export class EqualPWDDirective implements Validator {
    @Input('appForbiddenName') forbiddenName: string;

    validate(control: AbstractControl): { [key: string]: any } | null {
        console.log(this.forbiddenName);
        return equalValidator('123');
        // return this.forbiddenName ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
        //     : null;
    }
}
