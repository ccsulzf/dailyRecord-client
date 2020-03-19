import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { selectExpenseDetail } from '../../../../../actions/expense.action';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as expense from 'src/app/reducers/expense.reducer';
@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss']
})
export class ExpenseDetailComponent implements OnInit {

  @ViewChild('dateInputEle', { static: false }) private dateInputEle: ElementRef;

  private url = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private user = JSON.parse(localStorage.getItem('user'));

  public date = new Date();

  public totalAmount = 0;

  list = [];

  addExpenseDetail$: Observable<any>;
  editExpenseDetail$: Observable<any>;
  delExpenseDetail$: Observable<any>;
  constructor(
    private http: HttpClient,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.addExpenseDetail$ = this.store.select(expense.getAddExpenseDetail);
    this.editExpenseDetail$ = this.store.select(expense.getEditExpenseDetail);
    this.delExpenseDetail$ = this.store.select(expense.getDelExpenseDetailId);

    this.delExpenseDetail$.subscribe((data) => {
      let delExpenseDetail;
      for (const item of this.list) {
        delExpenseDetail = _.find(item.expenseDetailList, (temp) => {
          return temp.id === data.id
        });
        this.totalAmount -= delExpenseDetail.amount;
        item.subTotal -= delExpenseDetail.amount;
        _.remove(item.expenseDetailList, delExpenseDetail);
        break;
      }
      _.remove(this.list, (item) => {
        return item.expenseDetailList.length === 0;
      });
    });

    this.editExpenseDetail$.subscribe((data) => {
      if (data) {
        const oldId = data.oldId;
        const expenseDetail = data.expenseDetail;

        if (moment(this.date).isSame(expenseDetail.expenseDate)) {
          for (const item of this.list) {
            const oldItem = _.find(item.expenseDetailList, (temp) => {
              return temp.id === data.oldId
            });
            this.totalAmount -= oldItem.amount;
            item.subTotal -= oldItem.amount;
            _.remove(item.expenseDetailList, oldItem);
            break;
          }
          this.totalAmount += expenseDetail.amount;
          _.remove(this.list, (item) => {
            return item.expenseDetailList.length === 0;
          });
          const hasExpenseBook = _.find(this.list, (temp) => {
            return temp['expenseBookName'] === expenseDetail['expenseBook'].name;
          });
          if (hasExpenseBook) {
            hasExpenseBook.subTotal += expenseDetail.amount;
            const expenseDetailList = hasExpenseBook['hasExpenseBook'];
            expenseDetailList.push(expenseDetail);
          } else {
            this.list.push({
              expenseBookName: expenseDetail['expenseBook'].name,
              subTotal: expenseDetail['amount'],
              expenseDetailList: [
                expenseDetail
              ]
            });
          }
        } else {
          this.dateInputEle.nativeElement.value = moment(expenseDetail.expenseDate).format('YYYY/MM/DD');
          this.getExpenseDetailList(expenseDetail.expenseDate);
        }
      }
    });

    this.addExpenseDetail$.subscribe((expenseDetail: any) => {
      if (expenseDetail) {
        if (moment(this.date).isSame(expenseDetail.expenseDate)) {
          this.totalAmount += expenseDetail.amount;
          const hasExpenseBook = _.find(this.list, (temp) => {
            return temp['expenseBookName'] === expenseDetail['expenseBook'].name;
          });
          if (hasExpenseBook) {
            hasExpenseBook['subTotal'] += expenseDetail.amount;
            hasExpenseBook['expenseDetailList'].push(expenseDetail);
          } else {
            this.list.push({
              expenseBookName: expenseDetail['expenseBook'].name,
              subTotal: expenseDetail['amount'],
              expenseDetailList: [
                expenseDetail
              ]
            });
          }
        } else {
          this.dateInputEle.nativeElement.value = moment(expenseDetail.expenseDate).format('YYYY/MM/DD');
          this.getExpenseDetailList(expenseDetail.expenseDate);
        }
      }
    });
    this.getExpenseDetailList(this.date);
  }

  getExpenseDetailList(date) {
    date = moment(date).format('YYYY-MM-DD')
    this.http.get(this.url + `/expense/getList?userId=${this.user.id}&expenseDate=${date}`, this.httpOptions).toPromise().then((data) => {
      this.list = this.composeData(data);
    });
  }

  select(item) {
    this.store.dispatch(selectExpenseDetail(item));
  }

  dateSelect(event: MatDatepickerInputEvent<Date>) {
    this.getExpenseDetailList(moment(event.value).format('YYYY/MM/DD'));
  }

  // 数据格式
  /**
   * [
   *    expenseBookName:'',
   *    subTotal:0
  *     expenseDetailList:[
  *       detail
  *     ]
   * ]
   */
  composeData(list) {
    const dataList = [];
    this.totalAmount = 0;
    for (const item of list) {
      this.totalAmount += item.amount;
      const hasExpenseBook = _.find(dataList, (temp) => {
        return temp['expenseBookName'] === item['expenseBook'].name;
      });
      if (hasExpenseBook) {
        hasExpenseBook['subTotal'] += item.amount;
        hasExpenseBook['expenseDetailList'].push(item);
      } else {
        dataList.push({
          expenseBookName: item['expenseBook'].name,
          subTotal: item['amount'],
          expenseDetailList: [
            item
          ]
        });
      }
    }

    return dataList;
  }


}
