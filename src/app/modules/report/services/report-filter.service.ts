
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
@Injectable()
export class ReportFilterService {
    public conditionList = [];
    private selectCondition$ = new Subject<Object>();

    private filterCondition$ = new Subject<Object>() // 过滤条件选择
    private filterPage$ = new Subject<Object>();    // 分页条件选择

    constructor() {
        this.selectCondition$.subscribe((data) => {
            console.log(data);
        });
    }

    public selectCondition(data) {
        this.selectCondition$.next(data);
    }
}
