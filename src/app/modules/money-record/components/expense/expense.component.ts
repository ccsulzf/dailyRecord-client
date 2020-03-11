import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  date = '2019-12-01';
  private url = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private user = JSON.parse(localStorage.getItem('user'));

  expenseBook$: Observable<any>;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private store: Store<any>
  ) {
    this.expenseBook$ = store.select('expense');
    this.expenseBook$.subscribe((temp) => {
      this.currenExpenseBook = temp.selectedExpenseBook;
    });
   }

  currenExpenseBook;

  expenseForm = this.fb.group({
    expenseDate: [new Date()],
    address: [''],
    expenseCategory: [''],
    expenseStore: [''],
    content: [''],
    payChannel: [''],
    amount: [''],
    person: [[]],
    label: [[]],
    memo: ['']
  });


  ngOnInit() {
  }

  onSubmit() {
    const body = this.expenseForm.value;
    body.expenseDate = moment(body.expenseDate).format('YYYY/MM/DD');
    body.userId = this.user.id;
    body.payChannel.type = 1;
    // body.expenseCategory.expenseBookId = this.currenExpenseBook.id;
    // body.expenseBookId = this.currenExpenseBook.id;
    console.log(body);
    // this.http.post(this.url + '/expense/add', body, this.httpOptions).toPromise().then((data) => {

    // });
  }

  onSelectBook(item) {
    this.currenExpenseBook = item;
  }
}
