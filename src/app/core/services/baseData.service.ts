import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class BaseDataService {
    private url = 'http://localhost:3000';
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient
    ) { }

    getBaseData(model, searchStr) {
        return this.http.get(this.url + `/${model}?s=${searchStr}`, this.httpOptions).toPromise();
    }
}
