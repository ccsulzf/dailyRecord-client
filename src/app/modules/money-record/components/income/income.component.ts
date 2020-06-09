import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import * as moment from 'moment';
import { MessageService } from '../../../../services/message.service';
import { IncomeService } from '../../services';
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit, OnDestroy {
  private user = JSON.parse(localStorage.getItem('dr_user'));

  isAdd = true;
  getIncomeDetailSub: Subscription;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService,
    public incomeService: IncomeService
  ) {

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
    this.getIncomeDetailSub = this.incomeService.getDetail().subscribe((value: any) => {
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
    });

  }

  onSubmit() {
    this.incomeService.add(this.incomeForm.value).then((data: any) => {
      this.messageService.success('新增成功!');
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
      this.messageService.success('编辑成功!');
      this.incomeForm.patchValue({
        peoples: [],
        labels: [],
        memo: '',
        amount: '',
        content: ''
      });
      this.incomeForm.markAsPristine();
    }).catch((error) => {
      this.messageService.error('编辑失败');
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
    this.incomeService.del(this.incomeForm.value.id).then((data: any) => {
      this.cancel();
    }).catch((error) => {
      this.messageService.error('删除失败');
    });
  }

  cancel() {
    this.onReset();
    this.isAdd = true;
  }

  ngOnDestroy() {
    if (this.getIncomeDetailSub) {
      this.getIncomeDetailSub.unsubscribe();
    }
  }

}
