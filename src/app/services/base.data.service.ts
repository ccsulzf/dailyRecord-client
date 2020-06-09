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
    private baseData = {};
    private addBaseData$ = new Subject<object>();

    constructor(
        private http: HttpClient
    ) {
    }

    // 如果有就不用再去获取了，同一返回promise
    getBaseData(modelName, filterHide = true) {
        if (this.baseData[modelName]) {
            return new Promise((resolve) => {
                if (filterHide) {
                    resolve(_.filter(this.baseData[modelName], { isHide: false }))
                } else {
                    resolve(this.baseData[modelName]);
                }

            });
        } else {
            return this.http.get(`/${modelName}?s={"userId":${this.user.id},"deletedAt":null}`).pipe(
                map((list: any) => {
                    this.baseData[modelName] = list;
                    if (filterHide) {
                        return _.filter(list, { isHide: false });
                    } else {
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

}
