import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MessageService, BaseDataService } from '../../../../services';
import { ExpenseService } from '../../services';
import * as moment from 'moment';
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit, OnDestroy {
  private user = JSON.parse(localStorage.getItem('dr_user'));

  isAdd = true;
  getExpenseDetailSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private expenseService: ExpenseService,
    private baseDataService: BaseDataService
  ) {

  }

  expenseForm = this.fb.group({
    id: [''],
    userId: [this.user.id],
    expenseBook: ['', Validators.required],
    expenseDate: [moment(new Date()).format('YYYY-MM-DD'), Validators.required],
    address: ['', Validators.required],
    expenseCategory: ['', Validators.required],
    expenseStore: ['', Validators.required],
    content: ['', Validators.required],
    account: ['', Validators.required],
    amount: ['', Validators.required],
    people: [[]],
    label: [[]],
    memo: ['']
  });


  ngOnInit() {
    this.getExpenseDetailSub = this.expenseService.getDetail().subscribe((value: any) => {
      if (value) {
        this.isAdd = false;
        this.expenseForm.patchValue({
          id: value.id,
          expenseBook: value.expenseBook,
          expenseDate: value.expenseDate,
          amount: value.amount / 100,
          content: value.content,
          memo: value.memo,
          address: value.address,
          expenseStore: value.expenseStore,
          expenseCategory: value.expenseCategory,
          account: value.account,
          label: value.label,
          people: value.people
        });
      }
    });
  }

  /**
   * 总是发现账本和类别的对应不上
   */
  debugExpense() {
    const expenseBook = this.expenseForm.value['expenseBook'];
    const expenseCategory = this.expenseForm.value['expenseCategory'];

    if (expenseBook.id !== expenseCategory['expenseBookId']) {
      alert('出现BUG,请到控制台查看输出');
      console.log(this.expenseForm.value);
      return false;
    }
    return true;
  }

  onSubmit() {
    if (this.debugExpense() && this.expenseForm.valid) {
      this.expenseService.add(this.expenseForm.value).then((data: any) => {
        this.messageService.success('新增成功!');
        this.expenseForm.patchValue({
          people: [],
          label: [],
          memo: '',
          amount: '',
          content: ''
        });
        this.expenseForm.markAsPristine();
      }).catch((error) => {
        this.messageService.error('新增失败');
      });
    }

  }

  editExpense() {
    if (this.debugExpense() && this.expenseForm.valid) {
      this.expenseService.edit(this.expenseForm.value).then((data: any) => {
        this.messageService.success('编辑成功!');
        this.expenseForm.patchValue({
          people: [],
          label: [],
          memo: '',
          amount: '',
          content: ''
        });
        this.expenseForm.markAsPristine();
        this.isAdd = true;
      }).catch((error) => {
        this.messageService.error('编辑失败');
      });
    }
  }

  deleteExpense() {
    this.expenseService.del(this.expenseForm.value.id).then((data: any) => {
      this.cancel();
    }).catch((error) => {
      this.messageService.error('删除失败');
    });
  }

  onReset() {
    this.expenseForm.patchValue({
      expenseDate: moment(new Date()).format('YYYY-MM-DD'),
      expenseStore: '',
      account: '',
      people: [],
      label: [],
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
    if (this.getExpenseDetailSub) {
      this.getExpenseDetailSub.unsubscribe();
    }
  }
}
