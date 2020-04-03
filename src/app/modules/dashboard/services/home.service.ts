
import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import *  as _ from 'lodash';
import * as moment from 'moment';
import { combineLatest, Observable, zip } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable()
export class HomeService {
    private user = JSON.parse(localStorage.getItem('user'));
    private url = 'http://localhost:3000';
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    constructor(
        private http: HttpClient
    ) {
    }
    getTotal() {
        const incomeTotal = this.http.get(`${this.url}/chart/incomeTotal?userId=${this.user.id}`, this.httpOptions);
        const expenseTotal = this.http.get(`${this.url}/chart/expenseTotal?userId=${this.user.id}`, this.httpOptions);
        const total = zip(incomeTotal, expenseTotal);
        return total;
    }

    getGroupExpenseData(startDate, endDate, isExpenseBook) {
        return this.http.get(`${this.url}/chart/groupExpenseData?userId=${this.user.id}&startDate=${startDate}&endDate=${endDate}&isExpenseBook=${isExpenseBook}`, this.httpOptions).pipe(
            map((list: any) => {
                for (const item of list) {
                    if (!isExpenseBook) {
                        item.date = moment(item.expenseDate).format('YYYY-MM-DD');
                    }
                    item.amount = Number(item.amount);
                }
                return list;
            })
        ).toPromise();
    }

    getGroupIncomeData(startDate, endDate, isIncomeCategory) {
        return this.http.get(`${this.url}/chart/groupIncomeData?userId=${this.user.id}&startDate=${startDate}&endDate=${endDate}&isIncomeCategory=${isIncomeCategory}`, this.httpOptions).pipe(
            map((list: any) => {
                for (const item of list) {
                    if (!isIncomeCategory) {
                        item.date = moment(item.expenseDate).format('YYYY-MM-DD');
                    }
                    item.amount = Number(item.amount);
                }
                return list;
            })
        ).toPromise();
    }

}