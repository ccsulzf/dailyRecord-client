import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
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
  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  currenExpenseBook;

  expenseForm = this.fb.group({
    expenseDate: [new Date()],
    address: [{ id: '', name: '' }],
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
