import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ReportFilterService } from '../../../services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() item;
  list$: Observable<any>;
  private url = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private reportFilterService: ReportFilterService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    const strObj: any = {};
    const user = JSON.parse(localStorage.getItem('user'));
    strObj.userId = user.id;
    strObj.deletedAt = null;
    strObj.isHide = false;
    this.getlisttData(this.item.model, JSON.stringify(strObj));

  }

  getlisttData(model, searchStr) {
    this.list$ = this.http.get(this.url + `/${model}?s=${searchStr}`, this.httpOptions).pipe(
      map((data: any) => {
        for (let item of data) {
          item.selected = false;
        }
        return data;
      })
    );
  }

  select(item) {
    item.selected = !item.selected;
    if (item.selected) {
      this.item.value.push(item.id);
    } else {
      _.remove(this.item.value, (temp) => {
        return temp === item.id;
      });
    }
  }

}
