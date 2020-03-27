
import { Injectable } from '@angular/core';
import { Subject, Observable, zip, combineLatest, race, AsyncSubject } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';
import *  as _ from 'lodash';
@Injectable()
export class ReportFilterService {
    public conditionList = [];
    private filterCondition$ = new Subject<Object>(); // 过滤条件改变
    private composeFilter$ = new Subject<Object>(); // 组装最终的

    constructor() {

    }

    updateFilterCondition(value) {
        this.conditionList = value;
        this.filterCondition$.next(value);
        this.composeFilter$.next(this.compose([value, {
            skip: 0,
            take: 100
        }]));
    }

    updateFilterPage(value) {
        this.composeFilter$.next(this.compose([this.conditionList, value]));
    }

    filterConditionChange(): Observable<Object> {
        return this.filterCondition$;
    }
    getFilter(): Observable<Object> {
        return this.composeFilter$;
    }

    compose(value) {
        return {
            userId: JSON.parse(localStorage.getItem('user')).id,
            conditionList: this.pickValidCondition(value[0]),
            page: value[1]
        };
    }

    pickValidCondition(list) {
        return _.map(_.filter(list, this.isValid), (item) => {
            return _.pick(item, ['type', 'field', 'value'])
        });
    }

    isValid(item) {
        if (Array.isArray(item.value)) {
            if (item.value && item.value.length) {
                if (item.value.join('') === '') {
                    return false;
                }
            } else {
                return false;
            }
        }
        if ((typeof item.value) === 'string') {
            return item.value !== '';
        }
        return true;
    }
}
