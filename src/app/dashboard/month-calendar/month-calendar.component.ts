import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss']
})
export class MonthCalendarComponent implements OnInit {
  public tableList = [];

  public today = moment().format('YYYY-MM-DD');
  constructor() { }

  ngOnInit() {
    this.generateDateList('2020-05');
  }


  generateDateList(date) {
    const startDayWeek = moment(moment(date).startOf('month')).weekday() || 7;
    const endDayWeek = moment(moment(date).endOf('month')).weekday() || 7;
    const monthDasys = moment(date).daysInMonth();

    let dateList = [];

    for (let i = (startDayWeek); i >= 1; i--) {
      dateList.push({
        isInMonth: false,
        date: moment(moment(moment(date).startOf('month')).subtract(i, 'days')).format('YYYY-MM-DD'),
        day: monthDasys - i
      });
    }

    for (let i = 1; i <= monthDasys; i++) {
      dateList.push({
        isInMonth: true,
        date: moment(`${date}-${i}`).format('YYYY-MM-DD'),
        day: i,
        incomeAmount: parseInt(100 * Math.random()),
        expenseAmount: parseInt(100 * Math.random()),
        isToday: moment(`${date}-${i}`).format('YYYY-MM-DD') === this.today
      });
    }

    for (let i = 1; i <= (7 - endDayWeek); i++) {
      dateList.push({
        isInMonth: true,
        date: moment(moment(moment(date).endOf('month')).add(i, 'days')).format('YYYY-MM-DD'),
        day: i
      });
    }

    let tempList = [];
    for (let i = 1; i <= dateList.length; i++) {
      tempList.push(dateList[i]);
      if (i % 7 === 0) {
        this.tableList.push(tempList);
        tempList = [];
      }
    }

    console.log(this.tableList);
  }


}
