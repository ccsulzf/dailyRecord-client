import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from '../../../services';
import * as moment from 'moment';
import * as _ from 'lodash';
@Injectable()
export class IncomeService {
    private selectDetail$ = new Subject<object>();

    private originIncomeDetailList;
    public list = [];
    public totalAmount = 0;

    public incomeDetailDate = moment();
    constructor(
        private http: HttpClient,
        private baseDataService: BaseDataService
    ) { }

    add(incomeDetail) {
        const isInMonth = moment(incomeDetail.incomeDate).isBetween(
            moment(this.incomeDetailDate).startOf('month'),
            moment(this.incomeDetailDate).endOf('month')
        );
        return this.http.post('/income/add', incomeDetail).pipe(
            map((data: any) => {
                this.baseDataService.addBaseData(data.baseData);
                if (isInMonth) {
                    this.originIncomeDetailList.push(data.incomeDetail);
                    this.list = this.composeData();
                } else {
                    this.incomeDetailDate = moment(incomeDetail.incomeDate);
                    this.getList();
                }
                return data;
            })
        ).toPromise();
    }

    edit(incomeDetail) {
        const isInMonth = moment(incomeDetail.incomeDate).isBetween(
            moment(this.incomeDetailDate).startOf('month'),
            moment(this.incomeDetailDate).endOf('month')
        );
        return this.http.post('/income/edit', incomeDetail).pipe(
            map((data: any) => {
                this.baseDataService.addBaseData(data.baseData);
                if (isInMonth) {
                    _.remove(this.originIncomeDetailList, item => item.id === data.incomeDetail.id);
                    this.originIncomeDetailList.push(data.incomeDetail);
                    this.list = this.composeData();
                } else {
                    this.incomeDetailDate = moment(incomeDetail.incomeDate);
                    this.getList();
                }
                return data;
            })
        ).toPromise();
    }

    del(id) {
        return this.http.get(`/income/del?id=${id}`).pipe(
            map((data: any) => {
                _.remove(this.originIncomeDetailList, item => item.id === id);
                this.list = this.composeData();
                return data;
            })
        ).toPromise();
    }

    selectDetail(incomeDetail) {
        this.selectDetail$.next(incomeDetail);
    }

    getDetail(): Observable<object> {
        return this.selectDetail$;
    }

    getList() {
        const startDate = moment(this.incomeDetailDate).startOf('month').format('YYYY-MM-DD');
        const endDate = moment(this.incomeDetailDate).endOf('month').format('YYYY-MM-DD');
        this.http.get(`/income/list?startDate=${startDate}&endDate=${endDate}`).toPromise().then((data) => {
            this.originIncomeDetailList = data;
            this.list = this.composeData();
        });
    }

    composeData() {
        const dataList = [];
        this.totalAmount = 0;
        const list = _.reverse(_.sortBy(this.originIncomeDetailList, [function (o) { return o.incomeDate; }]));
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
}
