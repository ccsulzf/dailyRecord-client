import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as income from 'src/app/reducers/income.reducer';
import * as moment from 'moment';

import { addBaseData } from '../../../../actions/baseData.action';
import { addIncomeDetail, editIncomeDetail, delIncomeDetail } from '../../../../actions/income.action';
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {
  private url = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private user = JSON.parse(localStorage.getItem('user'));

  isAdd = true;
  getIncomeDetail$: Observable<any>;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private store: Store<any>
  ) {
    this.getIncomeDetail$ = store.select(income.getIncomeDetail);
  }

  incomeForm = this.fb.group({
    id: [''],
    userId: [this.user.id],
    incomeDate: [new Date()],
    address: [''],
    incomeCategory: [''],
    incomeStore: [''],
    content: [''],
    payChannel: [''],
    amount: [''],
    peoples: [[]],
    labels: [[]],
    memo: ['']
  });

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.incomeForm.value);
    const body = this.incomeForm.value;
    body.incomeDate = moment(body.incomeDate).format('YYYY/MM/DD');
    this.http.post(this.url + '/income/add', body, this.httpOptions).toPromise().then((data: any) => {
      this.store.dispatch(addBaseData(data.baseData));
      this.store.dispatch(addIncomeDetail(data.expenseDetail));
      this.incomeForm.patchValue({
        peoples: [],
        labels: [],
        memo: '',
        amount: '',
        content: ''
      });
      this.incomeForm.markAsPristine();
    }).catch((error) => {
      console.log(error);
    });
  }

}
