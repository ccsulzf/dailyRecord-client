
import { Injectable } from '@angular/core';
import { Subject, Observable, zip, combineLatest, race, AsyncSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import *  as _ from 'lodash';
import * as moment from 'moment';
import { map, startWith } from 'rxjs/operators';
interface Node {
    id: number;
    expandable: boolean;
    name: string;
    level: number;
    amount: number;
    isExpanded?: boolean;
}
@Injectable({ providedIn: 'root' })
export class DashboardService {
    private dateChange$ = new Subject();

    public monthTotalExpense;
    public monthTotalIncome;

    public startDate = moment().startOf('month').format('YYYY-MM-DD');
    public endDate = moment().endOf('month').format('YYYY-MM-DD');
    constructor(
        private http: HttpClient
    ) {
    }

    initDate() {
        this.startDate = moment().startOf('month').format('YYYY-MM-DD');
        this.endDate = moment().endOf('month').format('YYYY-MM-DD');
    }

    dateChange(): Observable<any> {
        return this.dateChange$;
    }

    nextMonth() {
        this.startDate = moment(this.startDate).add(1, 'month').startOf('month').format('YYYY-MM-DD');
        this.endDate = moment(this.startDate).endOf('month').format('YYYY-MM-DD');
        this.dateChange$.next();
    }

    prevMonth() {
        this.startDate = moment(this.startDate).subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
        this.endDate = moment(this.startDate).endOf('month').format('YYYY-MM-DD');
        this.dateChange$.next();
    }
    async getExpenseBookANDCategory() {
        const expenseBookList = await this.http.get(`/expenseBook?s={"deletedAt":null}`)
            .toPromise();
        const expenseCatgeoryList = await this.http.get(`/expenseCategory?s={"deletedAt":null}`)
            .toPromise();
        return this.composeBookAndCategory(expenseBookList, expenseCatgeoryList);
    }

    composeBookAndCategory(expenseBookList, expenseCategoryList) {
        const list: Node[] = [];
        for (const item of expenseBookList) {
            item.expandable = true;
            item.level = 0;
            item.isEdit = false;
            item.isExpanded = false;
            list.push(item);
            const filterList = expenseCategoryList.filter((temp) => {
                return temp.expenseBookId === item.id;
            });

            for (const categoryItem of filterList) {
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
        const monthData: any = await this.http.get(`/dashboard/getMonthDateData?startDate=${this.startDate}&endDate=${this.endDate}`)
            .toPromise();
        if (monthData && monthData.length) {
            this.monthTotalExpense = monthData.reduce((prev, item) => {
                return +item.expenseAmount + prev;
            }, 0);
            this.monthTotalIncome = monthData.reduce((prev, item) => {
                return +item.incomeAmount + prev;
            }, 0);
        }
        return monthData;
    }

    async getMonthExpenseCategroyData() {
        const monthCategoryData: any = await this.http.get(`/dashboard/getMonthExpenseCategroyData?startDate=${this.startDate}&endDate=${this.endDate}`)
            .toPromise();

        let list = [];

        for (const item of monthCategoryData) {
            const hasExpenseBook = _.find(list, temp => temp.id === item.expenseBookId);
            if (hasExpenseBook) {
                const temp = {
                    id: item.expenseCategoryId,
                    expandable: false,
                    level: 1,
                    isExpanded: false,
                    name: item.expenseCategoryName,
                    amount: item.amount
                };
                hasExpenseBook.amount += (+item.amount);
                hasExpenseBook['child'].push(temp);
            } else {
                const expenseBook = {
                    id: item.expenseBookId,
                    expandable: true,
                    level: 0,
                    isExpanded: false,
                    name: item.expenseBookName,
                    amount: +item.amount,
                    child: []
                };
                list.push(expenseBook);
                const expenseCategory = {
                    id: item.expenseCategoryId,
                    expandable: false,
                    level: 1,
                    isExpanded: false,
                    name: item.expenseCategoryName,
                    amount: +item.amount
                };
                expenseBook['child'].push(expenseCategory);
            }
        }

        let nodeList = [];

        list = _.reverse(_.sortBy(list, 'amount'));
        for (const item of list) {
            const child = item['child'];
            delete item.child;
            nodeList.push(item);
            nodeList = [...nodeList, ...child];
        }
        return nodeList;
    }

    getIncomeMonthCategoryData() {
        return this.http.get(`/dashboard/getIncomeMonthCategoryData?startDate=${this.startDate}&endDate=${this.endDate}`).toPromise();
    }

}