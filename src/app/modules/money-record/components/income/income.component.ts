import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as income from 'src/app/reducers/income.reducer';
import * as moment from 'moment';

import { addBaseData } from '../../../../actions/baseData.action';
import { addIncomeDetail, editIncomeDetail, delIncomeDetail, resetIncomeDetail } from '../../../../actions/income.action';
import { MessageService } from '../../../../services/message.service';
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit, OnDestroy {
  private user = JSON.parse(localStorage.getItem('dr_user'));

  isAdd = true;
  getIncomeDetail$: Observable<any>;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private store: Store<any>,
    private messageService: MessageService
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
    account: [''],
    amount: [''],
    peoples: [[]],
    labels: [[]],
    memo: ['']
  });

  ngOnInit() {
    this.getIncomeDetail$.subscribe((value) => {
      if (value) {
        this.isAdd = false;
        this.incomeForm.patchValue({
          id: value.id,
          incomeDate: value.incomeDate,
          amount: value.amount,
          content: value.content,
          memo: value.memo,
          address: value.address,
          incomeStore: value.incomeStore,
          incomeCategory: value.incomeCategory,
          account: value.account,
          labels: value.labels,
          peoples: value.peoples
        });
      }
    });
  }

  onSubmit() {
    const body = this.incomeForm.value;
    body.incomeDate = moment(body.incomeDate).format('YYYY/MM/DD');
    this.http.post('/income/add', body).toPromise().then((data: any) => {
      this.messageService.success('新增成功!');
      this.store.dispatch(addBaseData(data.baseData));
      this.store.dispatch(addIncomeDetail(data.incomeDetail));
      this.incomeForm.patchValue({
        peoples: [],
        labels: [],
        memo: '',
        amount: '',
        content: ''
      });
      this.incomeForm.markAsPristine();
    }).catch((error) => {
      this.messageService.error('新增失败');
    });
  }

  editIncome() {
    this.http.post('/income/edit', this.incomeForm.value).toPromise().then((data: any) => {
      this.store.dispatch(addBaseData(data.baseData));
      this.store.dispatch(editIncomeDetail({
        oldId: this.incomeForm.value.id,
        incomeDetail: data.incomeDetail
      }));
      this.cancel();
    }).catch((error) => {
      console.log(error);
    });
  }

  onReset() {
    this.incomeForm.patchValue({
      incomeDate: new Date(),
      incomeStore: '',
      account: '',
      peoples: [],
      labels: [],
      memo: '',
      amount: '',
      content: ''
    });
    this.incomeForm.markAsPristine();
  }

  deleteIncome() {
    this.http.get(`/income/del?userId=${this.user.id}&id=${this.incomeForm.value.id}`).toPromise()
      .then((data) => {
        this.store.dispatch(delIncomeDetail({ id: this.incomeForm.value.id }));
        this.cancel();
      }).catch((error) => {
        console.log(error);
      })
  }

  cancel() {
    this.onReset();
    this.isAdd = true;
  }

  ngOnDestroy() {
    this.store.dispatch(resetIncomeDetail(null));
  }

}
