
import { Injectable } from '@angular/core';
import *  as _ from 'lodash';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Injectable()
export class ReportExpenseService {
    private url = 'http://localhost:3000';
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient
    ) { }

    getList(data): Promise<any> {
        return this.http.post(this.url + '/report/expenseData', data, this.httpOptions).toPromise();
    }

    getTotal(data): Promise<any> {
        return this.http.post(this.url + '/report/expenseTotal', _.pick(data, ['userId', 'conditionList']), this.httpOptions).toPromise();
    }
}
