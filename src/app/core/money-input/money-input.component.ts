import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators, ControlValueAccessor, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export class MoneyInputErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const MONEY_INPUT_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MoneyInputComponent),
  multi: true
};

@Component({
  selector: 'app-money-input',
  templateUrl: './money-input.component.html',
  styleUrls: ['./money-input.component.scss'],
  providers: [MONEY_INPUT_ACCESSOR]
})
export class MoneyInputComponent implements OnInit, ControlValueAccessor {
  matcher = new MoneyInputErrorStateMatcher();
  moenyInputControl = new FormControl();
  constructor() { }

  ngOnInit() {
    this.moenyInputControl.valueChanges.subscribe((data) => {
      console.log(this.moenyInputControl);
      this.propagateChange(data);
    });
  }

  propagateChange = (temp: any) => { };

  writeValue(data: any): void {
    this.moenyInputControl.setValidators([Validators.required, Validators.pattern('^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$')]);
    this.moenyInputControl.setValue(data);
    this.moenyInputControl.markAsPristine();
    this.moenyInputControl.markAsUntouched();
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }

}
