import { Component, OnInit } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { selectIncomeDetail } from '../../../../../actions/income.action';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Moment } from 'moment';
import { FormControl } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as income from 'src/app/reducers/income.reducer';

export const INCOME_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-income-detail',
  templateUrl: './income-detail.component.html',
  styleUrls: ['./income-detail.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: INCOME_FORMATS },
  ],
})


export class IncomeDetailComponent implements OnInit {
  private url = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private user = JSON.parse(localStorage.getItem('user'));
  date = new FormControl(moment());

  list = [];

  totalAmount = 0;

  addIncomeDetail$: Observable<any>;
  editIncomeDetail$: Observable<any>;
  delIncomeDetail$: Observable<any>;

  constructor(
    private http: HttpClient,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.addIncomeDetail$ = this.store.select(income.getAddIncomeDetail);
    this.editIncomeDetail$ = this.store.select(income.getEditIncomeDetail);
    this.delIncomeDetail$ = this.store.select(income.getDelIncomeDetailId);
    this.addIncomeDetail$.subscribe((incomeDetail) => {
      if (incomeDetail) {
        if (moment(incomeDetail.incomeDate).isSame(this.date.value, 'month')) {
          this.totalAmount += incomeDetail.amount;
          const hasIncomeDate = _.find(this.list, (temp) => {
            return temp['incomeDate'] === incomeDetail['incomeDate'];
          });
          if (hasIncomeDate) {
            hasIncomeDate['incomeDetailList'].push(incomeDetail);
          } else {
            this.list.push({
              incomeDate: incomeDetail['incomeDate'],
              incomeDetailList: [
                incomeDetail
              ]
            });
          }
          this.list = _.orderBy(this.list, 'incomeDate', 'desc');
        } else {
          this.getIncomeDetailList(incomeDetail.incomeDate);
        }
      }
    });

    this.editIncomeDetail$.subscribe((data) => {
      if (data) {
        const incomeDetail = data.incomeDetail;
        if (moment(this.date.value).isSame(incomeDetail.incomeDate, 'month')) {
          for (const item of this.list) {
            const oldItem = _.find(item.incomeDetailList, (temp) => {
              return temp.id === data.oldId;
            });
            this.totalAmount -= oldItem.amount;
            _.remove(item.incomeDetailList, oldItem);
            break;
          }

          this.totalAmount += incomeDetail.amount;
          _.remove(this.list, (item) => {
            return item.incomeDetailList.length === 0;
          });

          const hasIncomeDate = _.find(this.list, (temp) => {
            return temp['incomeDate'] === incomeDetail['incomeDate'];
          });
          if (hasIncomeDate) {
            hasIncomeDate['incomeDetailList'].push(incomeDetail);
          } else {
            this.list.push({
              incomeDate: incomeDetail['incomeDate'],
              incomeDetailList: [
                incomeDetail
              ]
            });
          }
          this.list = _.orderBy(this.list, 'incomeDate', 'desc');
        } else {
          this.getIncomeDetailList(incomeDetail.incomeDate);
        }
      }
    });

    this.delIncomeDetail$.subscribe((data) => {
      let delIncomeDetail;
      for (const item of this.list) {
        delIncomeDetail = _.find(item.incomeDetailList, (temp) => {
          return temp.id === data.id;
        });
        this.totalAmount -= delIncomeDetail.amount;
        _.remove(item.incomeDetailList, delIncomeDetail);
        break;
      }
      _.remove(this.list, (item) => {
        return item.incomeDetailList.length === 0;
      });
    });
    this.getIncomeDetailList(this.date.value);
  }

  test() {
    setTimeout(() => {
      this.date.setValue(moment('2020-05'));
    }, 5000);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  getIncomeDetailList(date) {
    const startDate = moment(date).format('YYYY-MM-01');
    const endDate = moment(date).format('YYYY-MM-31');
    this.http.get(this.url + `/income/list?userId=${this.user.id}&startDate=${startDate}
    &endDate=${endDate}`, this.httpOptions).toPromise().then((data) => {
      this.list = this.composeData(data);
    });
  }

  composeData(list) {
    const dataList = [];
    this.totalAmount = 0;
    for (const item of list) {
      this.totalAmount += item.amount;
      const hasIncomeDate = _.find(dataList, (temp) => {
        return temp['incomeDate'] === item['incomeDate'];
      });
      if (hasIncomeDate) {
        hasIncomeDate['incomeDetailList'].push(item);
      } else {
        dataList.push({
          incomeDate: item['incomeDate'],
          incomeDetailList: [
            item
          ]
        });
      }
    }
    return dataList;
  }

  select(item) {
    this.store.dispatch(selectIncomeDetail(item));
  }

}

