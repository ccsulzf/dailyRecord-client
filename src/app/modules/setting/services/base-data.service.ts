
import { Injectable } from '@angular/core';

import {  HttpClient } from '@angular/common/http';
import *  as _ from 'lodash';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
interface Node {
    expandable: boolean;
    name: string;
    level: number;
    isExpanded?: boolean;
}
@Injectable()
export class BaseDataService {
    private user = JSON.parse(localStorage.getItem('dr_user'));
    public getExpenseBookANDCategory$: Observable<any>;
    public baseDataList = [];
    constructor(
        private http: HttpClient
    ) {
    }

    getBaseData(modelName) {
        this.http.get(`/${modelName}?s={"userId":${this.user.id},"deletedAt":null}`).pipe(
            map((list: any) => {
                for (let item of list) {
                    item.isEdit = false;
                }
                return list;
            })
        ).toPromise().then((data) => {
            this.baseDataList = data;
        });
    }

    updateBaseData(item, model) {
        return this.http.patch(`/${model}/${item.id}`, item).toPromise();
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

    hideExpenseBook(expenseBook, expenseCategoryList) {
        return this.http.post(`/baseData/hideExpenseBook`, { expenseBook, expenseCategoryList })
            .toPromise();
    }

    delExpenseBook(expenseBook, expenseCategoryList) {
        return this.http.post(`/baseData/delExpenseBook`, { expenseBook, expenseCategoryList })
            .toPromise();
    }

    hidePeople(item) {
        return this.http.post(`/baseData/hidePeople`, item)
            .toPromise();
    }

    delPeople(item) {
        return this.http.post(`/baseData/delPeople`, item)
            .toPromise();
    }

    hideLabel(item) {
        return this.http.post(`/baseData/hideLabel`, item)
            .toPromise();
    }

    delLabel(item) {
        return this.http.post(`/baseData/delLabel`, item)
            .toPromise();
    }

}
