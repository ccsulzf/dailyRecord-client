import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class BaseDataService {


    constructor(
        private http: HttpClient
    ) { }

    getBaseData(model, searchStr) {
        return this.http.get(`/${model}?s=${searchStr}`).toPromise();
    }
}
