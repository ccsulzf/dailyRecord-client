
import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'moment/locale/zh-cn';
import * as moment from 'moment';
import *  as _ from 'lodash';
import { repeat, toArray, map } from 'rxjs/operators';
@Injectable()
export class ReportIncomeService {
    private url = 'http://localhost:3000';
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient
    ) {
        moment.locale('zh-cn');
    }
    
    setDefaultDate(item) {
        item.value[0] = moment().startOf('month').format('YYYY-MM-DD');
        item.value[1] = moment().endOf('month').format('YYYY-MM-DD');
    }

    getList(data): Promise<any> {
        return this.http.post(this.url + '/report/incomeData', data, this.httpOptions).toPromise();
    }

    getTotal(data): Promise<any> {
        return this.http.post(this.url + '/report/incomeTotal', _.pick(data, ['userId', 'conditionList']), this.httpOptions).toPromise();
    }

}