import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
@Component({
    selector: 'app-lable-people',
    templateUrl: './label-people.component.html',
    styleUrls: ['./label-people.component.scss']
})
export class LabelPeopleComponent implements OnInit {
    @Input() item;
    list$: Observable<any>;

    private url = 'http://localhost:3000';
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    selectList = new FormControl([]);

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        const strObj: any = {};
        const user = JSON.parse(localStorage.getItem('user'));
        strObj.userId = user.id;
        strObj.deletedAt = null;
        strObj.isHide = false;
        this.getlisttData(this.item.model, JSON.stringify(strObj));
    }

    getlisttData(model, searchStr) {
        this.list$ = this.http.get(this.url + `/${model}?s=${searchStr}`, this.httpOptions);
    }

    select(value) {
        this.item.value = _.map(this.selectList.value, 'id');
    }

}
