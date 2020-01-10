import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators, ControlValueAccessor, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export class ContentInputErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const CONTENT_INPUT_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ContentInputComponent),
  multi: true
};

@Component({
  selector: 'app-content-input',
  templateUrl: './content-input.component.html',
  styleUrls: ['./content-input.component.scss'],
  providers: [CONTENT_INPUT_ACCESSOR]
})
export class ContentInputComponent implements OnInit, ControlValueAccessor {
  matcher = new ContentInputErrorStateMatcher();
  contentInputControl = new FormControl();
  constructor() { }

  ngOnInit() {
    this.contentInputControl.valueChanges.subscribe((data) => {
      this.propagateChange(data);
    });
  }

  propagateChange = (temp: any) => { };

  writeValue(data: any): void {
    this.contentInputControl.setValidators(Validators.required);
    this.contentInputControl.setValue(data);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }

  clear(){
    this.contentInputControl.setValue('');
  }
}
