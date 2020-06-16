import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from '../../../services';
import * as moment from 'moment';
import * as _ from 'lodash';
@Injectable()
export class ExpenseService {
    public user = JSON.parse(localStorage.getItem('dr_user'));

    private selectDetail$ = new Subject<object>();
    private selectBook$ = new Subject<object>();

    private originExpenseDetailList;
    public list = [];
    public totalAmount = 0;

    public expenseDetailDate = new Date();
    constructor(
        private http: HttpClient,
        private baseDataService: BaseDataService
    ) { }

    add(expenseDetail) {
        expenseDetail.expenseDate = moment(expenseDetail.expenseDate).format('YYYY/MM/DD');
        return this.http.post('/expense/add', expenseDetail).pipe(
            map((data: any) => {
                this.baseDataService.addBaseData(data.baseData);
                if (expenseDetail.expenseDate ===  moment(this.expenseDetailDate).format('YYYY/MM/DD')) {
                    this.originExpenseDetailList.push(data.expenseDetail);
                    this.list = this.composeData();
                } else {
                    this.expenseDetailDate = new Date(expenseDetail.expenseDate);
                    this.getList();
                }
                return data;
            })
        ).toPromise();
    }

    edit(expenseDetail) {
        expenseDetail.expenseDate = moment(expenseDetail.expenseDate).format('YYYY/MM/DD');
        return this.http.post('/expense/edit', expenseDetail).pipe(
            map((data: any) => {
                this.baseDataService.addBaseData(data.baseData);
                if (expenseDetail.expenseDate ===  moment(this.expenseDetailDate).format('YYYY/MM/DD')) {
                    _.remove(this.originExpenseDetailList, item => item.id === expenseDetail.id);
                    this.originExpenseDetailList.push(data.expenseDetail);
                    this.list = this.composeData();
                } else {
                    this.expenseDetailDate = new Date(expenseDetail.expenseDate);
                    this.getList();
                }
                return data;
            })
        ).toPromise();
    }

    del(id) {
        return this.http.get(`/expense/del?userId=${this.user.id}&id=${id}`).pipe(
            map((data: any) => {
                _.remove(this.originExpenseDetailList, item => item.id === id);
                this.list = this.composeData();
                return data;
            })
        ).toPromise();
    }

    selectDetail(expenseDetail) {
        this.selectDetail$.next(expenseDetail);
    }

    getDetail(): Observable<object> {
        return this.selectDetail$;
    }

    selectBook(expenseBook) {
        this.selectBook$.next(expenseBook);
    }

    getBook(): Observable<object> {
        return this.selectBook$;
    }

    getList() {
        const date =  moment(this.expenseDetailDate).format('YYYY/MM/DD');
        this.http.get(`/expense/getList?userId=${this.user.id}&expenseDate=${date}`).toPromise().then((data) => {
            if (data) {
                this.originExpenseDetailList = data;
                this.list = this.composeData();
            }
        });
    }

    composeData() {
        const dataList = [];
        this.totalAmount = 0;
        for (const item of this.originExpenseDetailList) {
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
                    subTotal: item['amount'],
                    expenseDetailList: [
                        item
                    ]
                });
            }
        }
        return dataList;
    }



}
