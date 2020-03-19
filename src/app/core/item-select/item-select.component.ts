import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators, ControlValueAccessor, NgForm, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material';
import { BaseDataService } from '../services/baseData.service';

import { Store, select } from '@ngrx/store';
import * as expense from 'src/app/reducers/expense.reducer';
import * as baseData from 'src/app/reducers/baseData.reducer';

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
  @Input() type: string;

  private user = JSON.parse(localStorage.getItem('user'));

  expenseBook$: Observable<any>;
  baseData$: Observable<any>;

  originList = new Array();
  dataList = new Array();
  filteredOptions: Observable<any[]>;

  matcher = new ItemSelectErrorStateMatcher();

  constructor(
    private baseDataService: BaseDataService,
    private store: Store<any>
  ) {
    this.expenseBook$ = store.select(expense.getSelectedExpenseBook);
    this.baseData$ = store.select(baseData.getAddBaseData);
    this.expenseBook$.subscribe((temp) => {
      this.filterByExpenseBook(temp);
    });
  }

  itemSelectControl = new FormControl();

  ngOnInit() {
    this.getList();
    this.baseData$.subscribe((data: Object) => {
      for (let key in data) {
        if (key === this.model) {
          this.originList = [...this.originList, data[key]];
          this.dataList = [...this.dataList, data[key]];
          this.itemSelectControl.setValue(data[key].name);
          this.propagateChange(data[key]);
          this.filteredOptions = this.itemSelectControl.valueChanges
            .pipe(
              startWith(''),
              map(value => this._filter(value))
            );
        }
      }
    });
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
      if (this.model === 'expenseCategory') {
        this.originList = data;
        this.expenseBook$.subscribe((temp) => {
          this.filterByExpenseBook(temp);
        });
      } else {
        if (this.model !== 'expenseStore' && this.model !== 'payChannel') {
          this.itemSelectControl.setValue(this.dataList[0].name);
          this.propagateChange(this.dataList[0]);
        }
        this.filteredOptions = this.itemSelectControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      }

    });
  }

  filterByExpenseBook(selectedExpenseBook) {
    if (selectedExpenseBook && this.model === 'expenseCategory' && this.originList && this.originList.length) {
      this.dataList = this.originList.filter((item: any) => {
        return item.expenseBookId === selectedExpenseBook.id;
      });
      if (this.dataList && this.dataList.length) {
        this.itemSelectControl.setValue(this.dataList[0].name);
        this.propagateChange(this.dataList[0]);
      } else {
        this.itemSelectControl.setValue('');
      }
      this.filteredOptions = this.itemSelectControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    }

  }

  propagateChange = (temp: any) => { };

  writeValue(data: any): void {
    data = data || { id: '', name: '', userId: this.user.id };
    if (this.model === 'payChannel') {
      data.type = this.type;
    }
    this.itemSelectControl.setValidators(Validators.required);
    this.itemSelectControl.setValue(data.name);
    this.propagateChange(data);
    this.itemSelectControl.markAsPristine();
    this.itemSelectControl.markAsUntouched();
  }

  select(data) {
    const value = data.option.value;
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
      // 这里为啥要用这个，以后怎么解决
      setTimeout(() => {
        if (this.model === 'payChannel') {
          this.propagateChange({
            id: '',
            name: (value.name || value),
            type: this.type,
            userId: this.user.id
          });
        } else {
          this.propagateChange({
            id: '',
            name: (value.name || value),
            userId: this.user.id
          });
        }

      });
      return [];
    }
  }

  getData() {

  }

}
