import { Component, OnInit, Input, forwardRef, OnDestroy } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators, ControlValueAccessor, NgForm, FormGroupDirective } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material';

import { ExpenseService } from '../../../services';
import { BaseDataService } from '../../../../../services';
import * as _ from 'lodash';


export class ExpenseCategorySelectErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const EXPENSE_CATEGORY_SELECT_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ExpenseCategorySelectComponent),
  multi: true
};

@Component({
  selector: 'expenseCategory-select',
  templateUrl: './expenseCatgeory-select.component.html',
  styleUrls: ['./expenseCatgeory-select.component.scss'],
  providers: [EXPENSE_CATEGORY_SELECT_ACCESSOR]
})

export class ExpenseCategorySelectComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() name;
  @Input() model;

  itemSelectControl = new FormControl();

  matcher = new ExpenseCategorySelectErrorStateMatcher();

  baseDataSub: Subscription;
  expenseBookSub: Subscription;

  allExpenseCategoryList = <any>[];
  expenseBookCategoryList = [];

  filterList = [];

  constructor(
    private baseDataService: BaseDataService,
    private expenseService: ExpenseService
  ) {

  }

  async ngOnInit() {
    this.expenseBookSub = this.expenseService.getBook().subscribe((temp: any) => {
      if (temp) {
        this.filterByExpenseBook();
      }
    });

    this.itemSelectControl.valueChanges.pipe(
      startWith(''),
    ).subscribe((data) => {
      this.filterByInput(data);
    });

    this.baseDataSub = this.baseDataService.getAddBaseData().subscribe((data) => {
      for (let key in data) {
        if (key === this.model) {
          this.allExpenseCategoryList = [...this.allExpenseCategoryList, data[key]];
          this.expenseBookCategoryList = [...this.expenseBookCategoryList, data[key]];
          this.itemSelectControl.setValue(data[key].name);
          this.propagateChange(data[key]);
        }
      }
    });
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }

  propagateChange = (temp: any) => { };

  writeValue(data: any): void {
    data = data || { id: '', name: '', isHide: false };
    this.itemSelectControl.setValidators(Validators.required);
    this.itemSelectControl.setValue(data.name);
    this.itemSelectControl.markAsPristine();
    this.itemSelectControl.markAsUntouched();
  }


  async filterByExpenseBook() {
    this.allExpenseCategoryList = await this.baseDataService.getBaseData('expenseCategory');
    this.expenseBookCategoryList = this.allExpenseCategoryList.filter((item) => {
      return item.expenseBookId === this.expenseService.currenBook.id;
    });
    if (this.expenseBookCategoryList && this.expenseBookCategoryList.length) {
      const item = this.expenseBookCategoryList[0];
      this.itemSelectControl.setValue(item.name);
      this.propagateChange(item);
    } else {
      this.itemSelectControl.setValue('');
    }
    this.filterList = _.cloneDeep(this.expenseBookCategoryList);
  }

  select(data) {
    const value = data.option.value;
    this.propagateChange(value);
    this.itemSelectControl.setValue(value.name);
  }

  // 如果该值
  filterByInput(value) {
    if (!value) {
      this.filterList = _.cloneDeep(this.expenseBookCategoryList);
      return;
    }

    const findItem = this.expenseBookCategoryList.find((item) => {
      return item.name === value;
    });

    this.filterList = this.expenseBookCategoryList.filter((item) => {
      return item.name.indexOf(value) > -1;
    });

    if (findItem) {
      this.propagateChange(findItem);
    } else {
      this.propagateChange({
        id: '',
        name: value,
        expenseBookId: this.expenseService.currenBook.id,
        isHide: false
      });
    }
  }

  ngOnDestroy() {
    if (this.baseDataSub) {
      this.baseDataSub.unsubscribe();
    }

    if (this.expenseBookSub) {
      this.expenseBookSub.unsubscribe();
    }
  }

}
