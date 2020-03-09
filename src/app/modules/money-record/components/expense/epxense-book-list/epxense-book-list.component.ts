import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-epxense-book-list',
  templateUrl: './epxense-book-list.component.html',
  styleUrls: ['./epxense-book-list.component.scss']
})
export class EpxenseBookListComponent implements OnInit {
  @Output() selectBook = new EventEmitter();

  list;

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
    private http: HttpClient
  ) { }

  openAddBook() {
    this.showAddExpenseBook = !this.showAddExpenseBook;
  }

  getExpenseBookList() {
    this.http.get(this.url + `/expenseBook?s={"userId":${this.user.id}}`, this.httpOptions).toPromise().then((data: Array<any>) => {
      if (data && data.length) {
        this.list = data;
        this.selectBook.emit(this.list[0]);
      }
    }, (error) => {
    });
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
