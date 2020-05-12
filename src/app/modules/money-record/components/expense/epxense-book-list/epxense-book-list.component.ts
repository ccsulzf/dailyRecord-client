import { Component, OnInit, Output, EventEmitter, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { selectExpenseBook } from '../../../../../actions/expense.action';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const EXPENSEBOOK_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EpxenseBookListComponent),
  multi: true
};

@Component({
  selector: 'app-epxense-book-list',
  templateUrl: './epxense-book-list.component.html',
  styleUrls: ['./epxense-book-list.component.scss'],
  providers: [EXPENSEBOOK_ACCESSOR]
})
export class EpxenseBookListComponent implements OnInit, ControlValueAccessor {
  list = [];
  currenBook;
  private user = JSON.parse(localStorage.getItem('dr_user'));
  showAddExpenseBook = false;

  ngOnInit() {
    this.getExpenseBookList();
  }

  constructor(
    private http: HttpClient,
    private store: Store<any>
  ) {
  }

  openAddBook() {
    this.showAddExpenseBook = !this.showAddExpenseBook;
  }

  getExpenseBookList() {
    const strObj: any = {};
    strObj.userId = this.user.id;
    strObj.deletedAt = null;
    strObj.isHide = false;
    this.http.get(`/expenseBook?s=${JSON.stringify(strObj)}`).toPromise().then((data: Array<any>) => {
      if (data && data.length) {
        this.list = data;
        this.currenBook = this.list[0];
        this.propagateChange(this.currenBook);
        this.store.dispatch(selectExpenseBook(this.list[0]));
      }
    }, (error) => {
    });
  }

  changeBook(item) {
    this.currenBook = item;
    this.store.dispatch(selectExpenseBook(item));
    this.propagateChange(item);
  }

  addBook(value) {
    const expenseBook = {
      userId: this.user.id,
      name: value
    };
    this.http.post('/expenseBook', expenseBook).toPromise().then((data) => {
      this.showAddExpenseBook = false;
      this.currenBook = data;
      this.list.push(data);
      this.propagateChange(data);
      this.store.dispatch(selectExpenseBook(data));
    }, (error) => {
    });
  }

  propagateChange = (temp: any) => { };

  writeValue(data: any): void {
    if (data) {
      this.currenBook = data;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }
}
