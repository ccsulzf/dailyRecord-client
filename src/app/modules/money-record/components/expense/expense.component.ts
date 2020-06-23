import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as expense from 'src/app/reducers/expense.reducer';

import { addBaseData } from '../../../../actions/baseData.action';
import { addExpenseDetail, editExpenseDetail, delExpenseDetail, resetExpenseDetail } from '../../../../actions/expense.action';

import { MessageService } from '../../../../message.service';
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit, OnDestroy {
  private user = JSON.parse(localStorage.getItem('dr_user'));

  isAdd = true;
  getExpenseDetail$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private store: Store<any>,
    private messageService: MessageService
  ) {
    this.getExpenseDetail$ = store.select(expense.getExpenseDetail);
  }

  expenseForm = this.fb.group({
    id: [''],
    userId: [this.user.id],
    expenseBook: [''],
    expenseDate: [new Date()],
    address: [''],
    expenseCategory: [''],
    expenseStore: [''],
    content: [''],
    account: [''],
    amount: [''],
    peoples: [[]],
    labels: [[]],
    memo: ['']
  });


  ngOnInit() {
    this.getExpenseDetail$.subscribe((value) => {
      if (value) {
        this.isAdd = false;
        this.expenseForm.patchValue({
          id: value.id,
          expenseBook: value.expenseBook,
          expenseDate: value.expenseDate,
          amount: value.amount,
          content: value.content,
          memo: value.memo,
          address: value.address,
          expenseStore: value.expenseStore,
          expenseCategory: value.expenseCategory,
          account: value.account,
          labels: value.labels,
          peoples: value.peoples
        });
      }
    });
  }

  onSubmit() {
    const body = this.expenseForm.value;
    body.expenseDate = moment(body.expenseDate).format('YYYY-MM-DD');

    this.http.post('/expense/add', body).toPromise().then((data: any) => {
      this.messageService.success('Add Expense Succes!');
      this.store.dispatch(addBaseData(data.baseData));
      this.store.dispatch(addExpenseDetail(data.expenseDetail));
      this.expenseForm.patchValue({
        peoples: [],
        labels: [],
        memo: '',
        amount: '',
        content: ''
      });
      this.expenseForm.markAsPristine();
    }).catch((error) => {
      this.messageService.error('Add Expense Failed!');
    });
  }

  editExpense() {
    this.http.post('/expense/edit', this.expenseForm.value).toPromise().then((data: any) => {
      this.store.dispatch(addBaseData(data.baseData));
      this.store.dispatch(editExpenseDetail({
        oldId: this.expenseForm.value.id,
        expenseDetail: data.expenseDetail
      }));
      this.cancel();
      this.expenseForm.patchValue({
        peoples: [],
        labels: [],
        memo: '',
        amount: '',
        content: ''
      });
      this.expenseForm.markAsPristine();
    }).catch((error) => {
      console.log(error);
    });
  }

  deleteExpense() {
    const query = {
      id: this.expenseForm.value.id,
      userId: this.user.id
    };
    this.http.get(`/expense/del?userId=${this.user.id}&id=${this.expenseForm.value.id}`).toPromise()
      .then((data) => {
        this.store.dispatch(delExpenseDetail({ id: this.expenseForm.value.id }));
        this.cancel();
      }).catch((error) => {
        console.log(error);
      })
  }

  onReset() {
    this.expenseForm.patchValue({
      expenseDate: new Date(),
      expenseStore: '',
      account: '',
      peoples: [],
      labels: [],
      memo: '',
      amount: '',
      content: ''
    });
    this.expenseForm.markAsPristine();
  }


  cancel() {
    this.onReset();
    this.isAdd = true;
  }

  ngOnDestroy() {
    this.store.dispatch(resetExpenseDetail(null));
  }
}
