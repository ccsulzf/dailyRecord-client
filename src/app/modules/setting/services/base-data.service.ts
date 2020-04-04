
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
        this.http.get(`${this.url}/${modelName}?s={"userId":${this.user.id},"deletedAt":null}`, this.httpOptions).pipe(
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
        return this.http.patch(`${this.url}/${model}/${item.id}`, item, this.httpOptions).toPromise();
    }


    async getExpenseBookANDCategory() {
        const expenseBookList = await this.http.get(`${this.url}/expenseBook?s={"userId":${this.user.id},"deletedAt":null}`,
            this.httpOptions)
            .toPromise();
        const expenseCatgeoryList = await this.http.get(`${this.url}/expenseCategory?s={"userId":${this.user.id},"deletedAt":null}`,
            this.httpOptions)
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
        return this.http.post(`${this.url}/baseData/hideExpenseBook`, { expenseBook, expenseCategoryList }, this.httpOptions)
            .toPromise();
    }

    delExpenseBook(expenseBook, expenseCategoryList) {
        return this.http.post(`${this.url}/baseData/delExpenseBook`, { expenseBook, expenseCategoryList }, this.httpOptions)
            .toPromise();
    }

    hidePeople(item) {
        return this.http.post(`${this.url}/baseData/hidePeople`, item, this.httpOptions)
            .toPromise();
    }
    
    delPeople(item) {
        return this.http.post(`${this.url}/baseData/delPeople`, item, this.httpOptions)
        .toPromise();
    }

    hideLabel(item) {
        return this.http.post(`${this.url}/baseData/hideLabel`, item, this.httpOptions)
            .toPromise();
    }
    
    delLabel(item) {
        return this.http.post(`${this.url}/baseData/delLabel`, item, this.httpOptions)
        .toPromise();
    }

}
