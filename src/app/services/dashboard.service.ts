
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import *  as _ from 'lodash';
import * as moment from 'moment';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
interface Node {
    expandable: boolean;
    name: string;
    level: number;
    isExpanded?: boolean;
}
@Injectable({ providedIn: 'root' })
export class DashboardService {

    public monthTotalExpense;
    public monthTotalIncome;

    private user = JSON.parse(localStorage.getItem('dr_user'));
    private startDate = moment().startOf('month').format('YYYY-MM-DD');
    private endDate = moment().endOf('month').format('YYYY-MM-DD');
    constructor(
        private http: HttpClient
    ) {
    }

    async getExpenseBookANDCategory() {
        const expenseBookList = await this.http.get(`/expenseBook?s={"userId":${this.user.id},"deletedAt":null}`)
            .toPromise();
        const expenseCatgeoryList = await this.http.get(`/expenseCategory?s={"userId":${this.user.id},"deletedAt":null}`)
            .toPromise();
        return this.composeBookAndCategory(expenseBookList, expenseCatgeoryList);
    }

    composeBookAndCategory(expenseBookList, expenseCategoryList) {
        const list: Node[] = [];
        for (let item of expenseBookList) {
            item.expandable = true;
            item.level = 0;
            item.isEdit = false;
            item.isExpanded = false;
            list.push(item);
            const filterList = expenseCategoryList.filter((temp) => {
                return temp.expenseBookId === item.id;
            });

            for (let categoryItem of filterList) {
                categoryItem.isEdit = false;
                categoryItem.expandable = false;
                categoryItem.level = 1;
                categoryItem.isExpanded = false;
                list.push(categoryItem);
            }
        }
        return list;
    }

    async getMonthDateData() {
        const monthData: any = await this.http.get(`/dashboard/getMonthDateData?userId=${this.user.id}&startDate=${this.startDate}&endDate=${this.endDate}`)
            .toPromise();
        if (monthData && monthData.length) {
            this.monthTotalExpense = monthData.reduce((prev, item) => {
                return (+item.expenseAmount * 1000 + prev * 1000) / 1000;
            }, 0);
            this.monthTotalIncome = monthData.reduce((prev, item) => {
                return (+item.incomeAmount * 1000 + prev * 1000) / 1000;
            }, 0);

            console.log(this.monthTotalIncome);
        }

        return monthData;
    }

}