import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import * as _ from 'lodash';


import { ExpenseService } from '../../../services';
@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss']
})
export class ExpenseDetailComponent implements OnInit {

  @ViewChild('dateInputEle', { static: false }) private dateInputEle: ElementRef;

  public date = new Date();

  constructor(
    public expenseService: ExpenseService
  ) { }

  ngOnInit() {
    this.expenseService.getList(this.date);
  }

  select(item) {
    this.expenseService.selectDetail(item);
  }

  dateSelect(event: MatDatepickerInputEvent<Date>) {
    this.expenseService.getList(event.value);
  }

}
