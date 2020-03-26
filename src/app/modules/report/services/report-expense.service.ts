
import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'moment/locale/zh-cn';
import * as moment from 'moment';
import *  as _ from 'lodash';
import { repeat, toArray, map } from 'rxjs/operators';
@Injectable()
export class ReportExpenseService {
    private url = 'http://localhost:3000';
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient
    ) {
        moment.locale('zh-cn');
    }

    setDefaultDate(filterOption) {
        const item = _.find(filterOption, { field: 'expenseDate' });
        item.value[0] = moment().week(moment().week()).startOf('week').format('YYYY-MM-DD');
        item.value[1] = moment().week(moment().week()).endOf('week').format('YYYY-MM-DD')
    }

    getList(data): Promise<any> {
        return this.http.post(this.url + '/report/expenseData', data, this.httpOptions).pipe(
            repeat(10),
            toArray(),
            map((value) => {
                return _.flattenDeep(value);
                // return [...value];
            })
        ).toPromise();
    }

    getTotal(data): Promise<any> {
        return this.http.post(this.url + '/report/expenseTotal', _.pick(data, ['userId', 'conditionList']), this.httpOptions).toPromise();
    }

}
