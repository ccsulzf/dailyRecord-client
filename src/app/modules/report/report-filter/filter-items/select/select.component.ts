import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseDataService } from '../../../../../services';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() item;
  list: any;
  filterList: any;
  hasSelectedList = false;
  inputCtrl = new FormControl();
  filteredList: Observable<any[]>;
  constructor(
    private baseDataService: BaseDataService
  ) { }

  async ngOnInit() {
    this.list = await this.baseDataService.getBaseData(this.item.model);
    this.filteredList = this.inputCtrl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => value ? this._filter(value) : this.list.slice()));
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


  private _filter(value: string): string[] {
    return this.list.filter(item => item.name.indexOf(value) === 0);
  }
}
