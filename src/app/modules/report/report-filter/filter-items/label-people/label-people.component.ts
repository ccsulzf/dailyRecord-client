import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseDataService } from '../../../../../services';
import * as _ from 'lodash';
@Component({
    selector: 'app-lable-people',
    templateUrl: './label-people.component.html',
    styleUrls: ['./label-people.component.scss']
})
export class LabelPeopleComponent implements OnInit {
    @Input() item;
    list$: Promise<any>;

    selectList = new FormControl([]);

    constructor(
        private http: HttpClient,
        private baseDataService: BaseDataService
    ) { }

    ngOnInit(): void {
        this.list$ = this.baseDataService.getBaseData(this.item.model);
    }


    select(value) {
        this.item.value = _.map(this.selectList.value, 'id');
    }

}
