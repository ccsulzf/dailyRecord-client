import { Component, OnInit, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';
import * as PY from 'pinyin';
import { ErrorStateMatcher } from '@angular/material';

export class AddressErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const ADDRESS_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AddressSelectComponent),
  multi: true
};

@Component({
  selector: 'app-address-select',
  templateUrl: './address-select.component.html',
  styleUrls: ['./address-select.component.scss'],
  providers: [ADDRESS_ACCESSOR]
})
export class AddressSelectComponent implements OnInit, ControlValueAccessor {

  matcher = new AddressErrorStateMatcher();
  addressControl = new FormControl();
  filteredOptions: Observable<any[]>;
  filterData = [];

  addressList = <any>[];

  loading = false;
  constructor(
    private httpClient: HttpClient
  ) { }
  ngOnInit() {
    this.httpClient.get('/assets/zh-CN-pinyin.json').subscribe((data) => {
      this.addressList = data;
    });
    this.filteredOptions = this.addressControl.valueChanges
      .pipe(
        map((value) => {
          if (typeof value !== 'object') {
            this.loading = true;
            return value;
          }
          return '';
        }),
        debounceTime(200),
        map(value => this._filter(value))
      );
  }

  propagateChange = (temp: any) => { };

  writeValue(data: any): void {
    this.addressControl.setValidators(Validators.required);
    this.addressControl.setValue(data);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }

  select(data) {
    const selectedAddress = data.option.value;
    const inputValue = selectedAddress.areaName + '-' + selectedAddress.cityName;
    this.addressControl.setValue(inputValue);
  }

  private _filter(value: string): string[] {
    const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
    // 如果是中文
    let list = [];
    if (reg.test(value)) {
      list = this.addressList.filter(item => item.cityName.includes(value) || item.areaName.includes(value));
    } else {
      const filterValue = value.toLowerCase();
      list = this.addressList.filter(item => item.cityPinyin.includes(filterValue) || item.areaPinyin.includes(filterValue));
    }
    this.loading = false;
    return list;
  }

}
