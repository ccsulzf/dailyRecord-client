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

  showAddExpenseBook = false;

  ngOnInit() {
    this.getExpenseBookList();
  }

  constructor(
    private http: HttpClient,
    private baseDataService: BaseDataService,
    public expenseService: ExpenseService
  ) {
  }

  openAddBook() {
    this.showAddExpenseBook = !this.showAddExpenseBook;
  }

  getExpenseBookList() {
    this.baseDataService.getBaseData('expenseBook').then((data: Array<any>) => {
      if (data && data.length) {
        this.list = data;
        this.expenseService.currenBook = this.list[0];
        this.propagateChange(this.list[0]);
        this.expenseService.selectBook(this.list[0]);
      }
    });
  }

  changeBook(item) {
    this.expenseService.currenBook = item;
    this.expenseService.selectBook(item);
    this.propagateChange(item);
  }

  addBook(value) {
    const expenseBook = {
      name: value
    };
    this.http.post('/expenseBook', expenseBook).toPromise().then((data) => {
      this.baseDataService.addBaseData({
        expenseBook: data
      });
      this.showAddExpenseBook = false;
      this.expenseService.currenBook = data;
      this.list.push(data);
      this.propagateChange(data);
      this.expenseService.selectBook(data);
    }, (error) => {
    });
  }

  propagateChange = (temp: any) => { };

  writeValue(data: any): void {
    if (data) {
      console.log(data);
      this.expenseService.currenBook = data;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }
}
