import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators, ControlValueAccessor, NgForm, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material';
import { BaseDataService } from '../services/baseData.service';
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
  @Input() model;
  @Input() type;
  // options: string[] = ['One', 'Two', 'Three'];
  dataList: object[];
  filteredOptions: Observable<any[]>;

  matcher = new ItemSelectErrorStateMatcher();

  constructor(
    private baseDataService: BaseDataService
  ) { }

  itemSelectControl = new FormControl();
  ngOnInit() {
    this.getList();
  }

  getList() {
    const strObj: any = {};
    const user = JSON.parse(localStorage.getItem('user'));
    strObj.userId = user.id;
    if (this.type) {
      strObj.type = this.type;
    }
    this.baseDataService.getBaseData(this.model, JSON.stringify(strObj)).then((data: any) => {
      this.dataList = data;
      this.filteredOptions = this.itemSelectControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    })
  }

  propagateChange = (temp: any) => { };

  writeValue(data: any): void {
    data = data || { id: '', name: '' };
    this.itemSelectControl.setValidators(Validators.required);
    this.itemSelectControl.setValue(data.name);
  }

  select(data) {
    // console.log(data);
    const value = data.option.value;
    // console.log();
    this.propagateChange(value);
    this.itemSelectControl.setValue(value.name);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }

  private _filter(value: any): any[] {
    const filterValue = (value.name || value).toLowerCase();
    const list: any = this.dataList.filter((option: any) => option.name.toLowerCase().includes(filterValue));
    if (list && list.length) {
      return list;
    } else {
      this.propagateChange({
        id: '',
        name: (value.name || value)
      });
      return [];
    }
  }

  getData() {

  }

}
