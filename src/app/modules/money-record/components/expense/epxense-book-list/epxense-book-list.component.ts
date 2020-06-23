import { Component, OnInit, Output, EventEmitter, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseDataService } from '../../../../../services';
import { ExpenseService } from '../../../services';
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
    private baseDataService: BaseDataService,
    private expenseService: ExpenseService
  ) {
  }

  openAddBook() {
    this.showAddExpenseBook = !this.showAddExpenseBook;
  }

  getExpenseBookList() {
    this.baseDataService.getBaseData('expenseBook').then((data: Array<any>) => {
      if (data && data.length) {
        this.list = data;
        this.currenBook = this.list[0];
        this.propagateChange(this.currenBook);
        this.expenseService.selectBook(this.currenBook);
      }
    });
  }

  changeBook(item) {
    this.currenBook = item;
    this.expenseService.selectBook(item);
    this.propagateChange(item);
  }

  addBook(value) {
    const expenseBook = {
      userId: this.user.id,
      name: value
    };
    this.http.post('/expenseBook', expenseBook).toPromise().then((data) => {
      this.baseDataService.addBaseData({
        expenseBook: data
      });
      this.showAddExpenseBook = false;
      this.currenBook = data;
      this.list.push(data);
      this.propagateChange(data);
      this.expenseService.selectBook(data);
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
