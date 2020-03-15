import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { selectExpenseBook } from '../../../../../actions/expense.action';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-epxense-book-list',
  templateUrl: './epxense-book-list.component.html',
  styleUrls: ['./epxense-book-list.component.scss']
})
export class EpxenseBookListComponent implements OnInit {
  list;
  currenBook;
  private url = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private user = JSON.parse(localStorage.getItem('user'));
  showAddExpenseBook = false;

  expenseBook$: Observable<any>;
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
        this.store.dispatch(selectExpenseBook(this.list[0]));
      }
    }, (error) => {
    });
  }

  changeBook(item){
    this.currenBook = item;
    this.store.dispatch(selectExpenseBook(item));
  }

  addBook(value) {
    const expenseBook = {
      userId: this.user.id,
      name: value
    }
    this.http.post(this.url + '/expenseBooks', expenseBook, this.httpOptions).toPromise().then((data) => {
      this.showAddExpenseBook = false;
      this.list.push(data);
    }, (error) => {
    });

  }

}
