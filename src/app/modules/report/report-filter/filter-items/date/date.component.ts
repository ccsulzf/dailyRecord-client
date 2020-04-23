import { Component, OnInit, Input } from '@angular/core';
import * as moment from "moment";
import { MatDatepickerInputEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  @Input() item;
  start = new FormControl();
  end = new FormControl();
  constructor() { }

  ngOnInit() {
    this.start.setValue(this.item.value[0]);
    this.end.setValue(this.item.value[1]);
  }

  startDateChange($event: MatDatepickerInputEvent<moment.Moment>) {
    this.item.value[0] = moment($event.value).format('YYYY/MM/DD');
  }

  endDateChange($event: MatDatepickerInputEvent<moment.Moment>) {
    this.item.value[1] = moment($event.value).format('YYYY/MM/DD');
  }
}
