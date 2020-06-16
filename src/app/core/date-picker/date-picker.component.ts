import { Component, OnInit, forwardRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
export class DateErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const DATEPICKER_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true
};

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [DATEPICKER_ACCESSOR]
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
  dateFormControl = new FormControl();

  matcher = new DateErrorStateMatcher();
  constructor(
  ) { }

  ngOnInit() {

  }

  propagateChange = (temp: any) => { };

  writeValue(data: any): void {
    console.log(data);
    this.dateFormControl.setValidators(Validators.required);
    this.dateFormControl.patchValue(data);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }

  dateSelect(event: MatDatepickerInputEvent<Date>) {
    // this.dateFormControl.setValue(moment(event.value).format('YYYY/MM/DD'));
    this.dateFormControl.setValue(event.value);
    this.propagateChange(moment(event.value).format('YYYY/MM/DD'));
  }


  setDisabledState?(isDisabled: boolean): void {

  }
}
