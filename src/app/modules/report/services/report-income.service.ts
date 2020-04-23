
import { Injectable } from '@angular/core';

import {  HttpClient } from '@angular/common/http';
import 'moment/locale/zh-cn';
import * as moment from 'moment';
import *  as _ from 'lodash';
import { repeat, toArray, map } from 'rxjs/operators';
@Injectable()
export class ReportIncomeService {
    constructor(
        private http: HttpClient
    ) {
        moment.locale('zh-cn');
    }

    setDefaultDate(item) {
        item.value[0] = moment().startOf('month').format('YYYY/MM/DD');
        item.value[1] = moment().endOf('month').format('YYYY/MM/DD');
    }

    getList(data): Promise<any> {
        return this.http.post('/report/incomeData', data).toPromise();
    }

    getTotal(data): Promise<any> {
        return this.http.post('/report/incomeTotal', _.pick(data, ['userId', 'conditionList'])).toPromise();
    }

}