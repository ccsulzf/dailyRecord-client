import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { selectExpenseDetail } from '../../../../../actions/expense.action';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss']
})
export class ExpenseDetailComponent implements OnInit {
  private url = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private user = JSON.parse(localStorage.getItem('user'));

  public date = moment().format('YYYY-MM-DD');

  public totalAmount = 0;

  list$: Observable<any[]>;
  constructor(
    private http: HttpClient,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.getExpenseDetailList(this.date);
  }

  getExpenseDetailList(date) {
    this.list$ =  this.http.get(this.url + `/expense/getList?userId=${this.user.id}&expenseDate=${date}`, this.httpOptions)
    .pipe(
      map(value => this.composeData(value))
    );
  }

  select(item){
    console.log(item);
    this.store.dispatch(selectExpenseDetail(item));
  }

  dateSelect(event: MatDatepickerInputEvent<Date>) {
    this.getExpenseDetailList(moment(event.value).format('YYYY-MM-DD'));
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
          subTotal:item['amount'],
          expenseDetailList: [
            item
          ]
        });
      }
    }

    return dataList;
  }


}
