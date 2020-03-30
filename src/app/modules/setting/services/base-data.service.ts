
import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
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
    private user = JSON.parse(localStorage.getItem('user'));
    private url = 'http://localhost:3000';
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    public getExpenseBookANDCategory$: Observable<any>;
    public baseDataList = [];
    constructor(
        private http: HttpClient
    ) {
    }

    getBaseData(modelName) {
        this.http.get(`${this.url}/${modelName}?s={"userId":${this.user.id}}`, this.httpOptions).pipe(
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

    async getExpenseBookANDCategory() {
        const expenseBookList = await this.http.get(`${this.url}/expenseBook?s={"userId":${this.user.id}}`, this.httpOptions)
            .toPromise();
        const expenseCatgeoryList = await this.http.get(`${this.url}/expenseCategory?s={"userId":${this.user.id}}`, this.httpOptions)
            .toPromise();
        return this.composeBookAndCategory(expenseBookList, expenseCatgeoryList);
    }

    composeBookAndCategory(expenseBookList, expenseCategoryList) {
        const list: Node[] = [];
        for (let item of expenseBookList) {
            item.expandable = true;
            item.level = 0;
            item.isEdit = false;
            list.push(item);
            const filterList = expenseCategoryList.filter((temp) => {
                return temp.expenseBookId === item.id;
            });

            for (let categoryItem of filterList) {
                categoryItem.isEdit = false;
                categoryItem.expandable = false;
                categoryItem.level = 1;
                list.push(categoryItem);
            }
        }
        return list;
    }
}
