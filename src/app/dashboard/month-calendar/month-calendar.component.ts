import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from '../../services';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss']
})
export class MonthCalendarComponent implements OnInit, OnDestroy {
  public tableList = [];
  public monthData;
  public today = moment().format('YYYY-MM-DD');
  dateChange: Subscription;
  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.getList();
    this.dateChange = this.dashboardService.dateChange().subscribe(() => {
      this.getList();
    });
  }

  async getList() {
    this.tableList = [];
    this.monthData = await this.dashboardService.getMonthDateData();
    this.generateDateList(moment(this.dashboardService.startDate).format('YYYY-MM'));
  }


  generateDateList(date) {
    const monthDasys = moment(date).daysInMonth();
    const startDayWeek = new Date(`${date}-01`).getDay() || 7;
    const endDayWeek = new Date(`${date}-${monthDasys}`).getDay() || 7;

    const dateList = [];

    for (let i = (startDayWeek); i >= 1; i--) {
      dateList.push({
        isInMonth: false,
        date: moment(moment(moment(date).startOf('month')).subtract(i, 'days')).format('YYYY-MM-DD'),
        day: monthDasys - i
      });
    }

    for (let i = 1; i <= monthDasys; i++) {
      const item = _.find(this.monthData, item => item.date === i);
      dateList.push({
        isInMonth: true,
        date: moment(`${date}-${i}`).format('YYYY-MM-DD'),
        day: i,
        incomeAmount: item.incomeAmount || '',
        expenseAmount: item.expenseAmount || '',
        isToday: moment(`${date}-${i}`).format('YYYY-MM-DD') === this.today
      });
    }

    for (let i = 1; i <= (7 - endDayWeek); i++) {
      dateList.push({
        isInMonth: false,
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

    // console.log(this.tableList);
  }

  ngOnDestroy() {
    this.tableList = [];
    if (this.dateChange) {
      this.dateChange.unsubscribe();
    }
  }

}
