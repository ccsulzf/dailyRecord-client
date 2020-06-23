import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
@Injectable({
    providedIn: 'root',
})

export class BaseDataService {
    private user = JSON.parse(localStorage.getItem('dr_user'));
    public baseData = {};
    private addBaseData$ = new Subject<object>();
    public currenBaseDataList = [];
    constructor(
        private http: HttpClient
    ) {
    }

    // 如果有就不用再去获取了，同一返回promise
    getBaseData(modelName, filterHide = true) {
        if (this.baseData[modelName]) {
            return new Promise((resolve) => {
                if (filterHide) {
                    this.currenBaseDataList = _.filter(this.baseData[modelName], { isHide: false });
                    resolve(_.filter(this.baseData[modelName], { isHide: false }))
                } else {
                    this.currenBaseDataList = this.baseData[modelName];
                    resolve(this.baseData[modelName]);
                }

            });
        } else {
            return this.http.get(`/${modelName}?s={"userId":${this.user.id},"deletedAt":null}`).pipe(
                map((list: any) => {
                    this.baseData[modelName] = list;
                    if (filterHide) {
                        this.currenBaseDataList = _.filter(list, { isHide: false });
                        return _.filter(list, { isHide: false });
                    } else {
                        this.currenBaseDataList = list;
                        return list;
                    }
                })
            ).toPromise();
        }
    }


    addBaseData(data) {
        this.addBaseData$.next(data);
        _.forIn(data, (value, key) => {
            Array.isArray(value) ?
                this.baseData[key] = [...(this.baseData[key] || []),
                ...value] : this.baseData[key].push(data[key]);
        });
    }

    getAddBaseData(): Observable<object> {
        return this.addBaseData$;
    }

    updateBaseData(item, model) {
        return this.http.patch(`/${model}/${item.id}`, item).toPromise();
    }

    delBaseData(item, model) {

        return this.http.patch(`/${model}/${item.id}`, item).toPromise();
    }

    async getExpenseBookANDCategory() {
        const expenseBookList = await this.getBaseData('expenseBook', false);

        const expenseCatgeoryList = await this.getBaseData('expenseCategory', false);

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
