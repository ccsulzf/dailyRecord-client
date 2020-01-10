import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators, ControlValueAccessor, NgForm, FormGroupDirective } from '@angular/forms';

export const MEMO_INPUT_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MemoInputComponent),
  multi: true
};

@Component({
  selector: 'app-memo-input',
  templateUrl: './memo-input.component.html',
  styleUrls: ['./memo-input.component.scss'],
  providers: [MEMO_INPUT_ACCESSOR]
})

export class MemoInputComponent implements OnInit, ControlValueAccessor {
  memoInputControl = new FormControl();
  constructor() { }

  ngOnInit() {
    this.memoInputControl.valueChanges.subscribe((data) => {
      this.propagateChange(data);
    });
  }

  propagateChange = (temp: any) => { };

  writeValue(data: any): void {
    this.memoInputControl.setValue(data);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }

}
