import { Component, OnInit, Output, EventEmitter, forwardRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  list;
  currenBook;
  private url = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private user = JSON.parse(localStorage.getItem('user'));
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
    this.http.get(this.url + `/expenseBook?s={"userId":${this.user.id}}`, this.httpOptions).toPromise().then((data: Array<any>) => {
      if (data && data.length) {
        this.list = data;
        this.currenBook = this.list[0];
        this.propagateChange(this.currenBook.id);
        this.store.dispatch(selectExpenseBook(this.list[0]));
      }
    }, (error) => {
    });
  }

  changeBook(item) {
    this.currenBook = item;
    this.store.dispatch(selectExpenseBook(item));
    this.propagateChange(item.id);
  }

  addBook(value) {
    const expenseBook = {
      userId: this.user.id,
      name: value
    };
    this.http.post(this.url + '/expenseBook', expenseBook, this.httpOptions).toPromise().then((data) => {
      this.showAddExpenseBook = false;
      this.list.push(data);
    }, (error) => {
    });
  }

  propagateChange = (temp: any) => { };

  writeValue(data: any): void {
    if(data){
      const expenseBook = this.list.find( item => item.id === data);
      this.currenBook = expenseBook;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }
}
