import { Component, OnInit, Input, forwardRef, OnDestroy } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators, ControlValueAccessor, NgForm, FormGroupDirective } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material';
import { BaseDataService } from '../../services';

import * as _ from 'lodash';

export class ItemSelectErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const ITEM_SELECT_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ItemSelectComponent),
  multi: true
};

@Component({
  selector: 'app-item-select',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.scss'],
  providers: [ITEM_SELECT_ACCESSOR]
})
export class ItemSelectComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() name;
  @Input() model;
  matcher = new ItemSelectErrorStateMatcher();
  private user = JSON.parse(localStorage.getItem('dr_user'));

  baseData$: Observable<any>;
  baseDataSub: Subscription;

  dataList = new Array();

  filterList = new Array();


  constructor(
    private baseDataService: BaseDataService,
  ) {
  }

  itemSelectControl = new FormControl();

  ngOnInit() {
    this.getList();
    this.baseDataService.getAddBaseData().subscribe((data: Object) => {
      for (let key in data) {
        if (key === this.model) {
          this.dataList = [...this.dataList, data[key]];
          this.filterList = [...this.filterList, data[key]];
          this.itemSelectControl.setValue(data[key].name);
          this.propagateChange(data[key]);
        }
      }
    });

    this.itemSelectControl.valueChanges.pipe(
      startWith(''),
    ).subscribe((data) => {
      this.filterByInput(data);
    });

  }

  getList() {
    this.baseDataService.getBaseData(this.model).then((data: any) => {
      this.dataList = data;
      if (this.model === 'address') {
        this.itemSelectControl.setValue(this.dataList[0].name);
        this.propagateChange(this.dataList[0]);
      }
    });
  }


  propagateChange = (temp: any) => { };

  writeValue(data: any): void {
    data = data || { id: '', name: '', userId: this.user.id };
    this.itemSelectControl.setValidators(Validators.required);
    this.itemSelectControl.setValue(data.name);
    this.propagateChange(data);
    this.itemSelectControl.markAsPristine();
    this.itemSelectControl.markAsUntouched();
  }

  select(data) {
    const value = data.option.value;
    this.propagateChange(value);
    this.itemSelectControl.setValue(value.name);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }

  // 如果该值
  filterByInput(value) {
    if (!value) {
      this.filterList = _.cloneDeep(this.dataList);
      return;
    }

    const findItem = this.dataList.find((item) => {
      return item.name === value;
    });

    this.filterList = this.dataList.filter((item) => {
      return item.name.indexOf(value) > -1;
    });

    if (findItem) {
      this.propagateChange(findItem);
    } else {
      this.propagateChange({
        id: '',
        name: value,
        userId: this.user.id,
      });
    }
  }

  ngOnDestroy() {
    if (this.baseDataSub) {
      this.baseDataSub.unsubscribe();
    }
  }


}
