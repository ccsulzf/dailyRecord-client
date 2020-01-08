import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators, ControlValueAccessor, NgForm, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material';

export class ItemSelectErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const ITEM_SELECT_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ItemSelectComponent),
  multi: true
};

@Component({
  selector: 'app-item-select',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.scss'],
  providers: [ITEM_SELECT_ACCESSOR]
})
export class ItemSelectComponent implements OnInit, ControlValueAccessor {
  @Input() name;
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  matcher = new ItemSelectErrorStateMatcher();
  itemSelectControl = new FormControl();
  ngOnInit() {
    this.filteredOptions = this.itemSelectControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  propagateChange = (temp: any) => { };

  writeValue(data: any): void {
    this.itemSelectControl.setValidators(Validators.required);
    this.itemSelectControl.setValue(data);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
