
import { Injectable } from '@angular/core';
import { Subject, Observable, zip, combineLatest, race, AsyncSubject } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';
import *  as _ from 'lodash';
@Injectable()
export class ReportFilterService {
    public conditionList = [];

    private filterCondition$ = new Subject<Object>(); // 过滤条件选择
    private filterPage$ = new Subject<Object>();    // 分页条件选择
    private composeFilter$: Observable<Object>; // 组装最终的

    constructor() {

        this.composeFilter$ = combineLatest(this.filterCondition$, this.filterPage$).pipe(
            map(value => this.compose(value))
        );
    }

    updateFilterCondition(value) {
        this.filterCondition$.next(value);
    }

    updateFilterPage(value) {
        this.filterPage$.next(value);
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
