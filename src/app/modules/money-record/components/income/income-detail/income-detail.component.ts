import { Component, OnInit } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Moment } from 'moment';
import { FormControl } from '@angular/forms';
import { IncomeService } from '../../../services';

export const INCOME_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-income-detail',
  templateUrl: './income-detail.component.html',
  styleUrls: ['./income-detail.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: INCOME_FORMATS },
  ],
})
export class IncomeDetailComponent implements OnInit {
  date = new FormControl(moment());

  constructor(
    private incomeService: IncomeService
  ) { }

  ngOnInit() {
    this.incomeService.getList(this.date.value);

  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  select(item) {
    this.incomeService.selectDetail(item);
  }

}

