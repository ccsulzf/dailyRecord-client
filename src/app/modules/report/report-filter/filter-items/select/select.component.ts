import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ReportFilterService } from '../../../services';
import { BaseDataService } from '../../../../../services';
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
  list$: Promise<any>;

  constructor(
    private reportFilterService: ReportFilterService,
    private baseDataService: BaseDataService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.list$ = this.baseDataService.getBaseData(this.item.model);
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
