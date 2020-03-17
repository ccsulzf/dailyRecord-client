import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as expense from 'src/app/reducers/expense.reducer';

import { addBaseData } from '../../../../actions/baseData.action';
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
    this.expenseBook$ = store.select(expense.getSelectedExpenseBook);
    this.expenseBook$.subscribe((temp) => {
      this.currenExpenseBook = temp;
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
    // address: [{id:'3',name:'深圳'}],
  }

  onSubmit() {
    const body = this.expenseForm.value;
    body.expenseDate = moment(body.expenseDate).format('YYYY/MM/DD');
    body.userId = this.user.id;
    body.expenseCategory.expenseBookId = this.currenExpenseBook.id;
    body.expenseBookId = this.currenExpenseBook.id;
    this.http.post(this.url + '/expense/add', body, this.httpOptions).toPromise().then((data: any) => {
      this.store.dispatch(addBaseData(data.baseData));
      this.expenseForm.patchValue({
        person: [],
        label: [],
        memo: '',
        amount: '',
        content: ''
      });
      this.expenseForm.markAsPristine();
    }).catch((error) => {
      console.log(error);
    });
  }

  onReset() {
    this.expenseForm.patchValue({
      expenseDate: new Date(),
      expenseStore: '',
      payChannel: '',
      person: [],
      label: [],
      memo: '',
      amount: '',
      content: ''
    });
    this.expenseForm.markAsPristine();
  }

  onSelectBook(item) {
    this.currenExpenseBook = item;
  }
}
