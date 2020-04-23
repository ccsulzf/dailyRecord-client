
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import *  as _ from 'lodash';
import * as moment from 'moment';
import { combineLatest, Observable, zip } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable()
export class HomeService {
    private user = JSON.parse(localStorage.getItem('user'));

    constructor(
        private http: HttpClient
    ) {
    }
    getTotal() {
        const incomeTotal = this.http.get(`/chart/incomeTotal?userId=${this.user.id}`);
        const expenseTotal = this.http.get(`/chart/expenseTotal?userId=${this.user.id}`);
        const total = zip(incomeTotal, expenseTotal);
        return total;
    }

    getGroupExpenseData(startDate, endDate, isExpenseBook) {
        return this.http.get(`/chart/groupExpenseData?userId=${this.user.id}&startDate=${startDate}&endDate=${endDate}&isExpenseBook=${isExpenseBook}`).pipe(
            map((list: any) => {
                for (const item of list) {
                    if (!isExpenseBook) {
                        item.date = moment(item.expenseDate).format('YYYY/MM/DD');
                    }
                    item.amount = Number(item.amount);
                }
                if (isExpenseBook) {
                    return _.reverse(_.sortBy(list, 'amount'));
                } else {
                    return list;
                }

            })
        ).toPromise();
    }

    getGroupIncomeData(startDate, endDate, isIncomeCategory) {
        return this.http.get(`/chart/groupIncomeData?userId=${this.user.id}&startDate=${startDate}&endDate=${endDate}&isIncomeCategory=${isIncomeCategory}`).pipe(
            map((list: any) => {
                for (const item of list) {
                    if (!isIncomeCategory) {
                        item.date = moment(item.expenseDate).format('YYYY/MM/DD');
                    }
                    item.amount = Number(item.amount);
                }
                return _.reverse(_.sortBy(list, 'amount'));
            })
        ).toPromise();
    }

}
