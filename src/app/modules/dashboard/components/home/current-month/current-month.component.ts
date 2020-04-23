import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../services';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-current-month',
  templateUrl: './current-month.component.html',
  styleUrls: ['./current-month.component.scss']
})

export class CurrentMonthComponent implements OnInit {

  options: any;
  updateOptions: any;


  type = 'expense';

  private monthStart = moment().startOf('month').format('YYYY/MM/DD');
  private monthEnd = moment().endOf('month').format('YYYYMM/DD');

  public list = [];

  public sum = 0;

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.options = {
      visualMap: [{
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
      }],
      title: {
        top: 5,
        left: 'center',
        text: '',
        textStyle: {
          fontWeight: 400
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: this.getVirtulData([]).map((item) => {
          return item[0];
        })
      },
      yAxis: {
        splitLine: { show: false },
      },
      series: {
        type: 'line',
        showSymbol: false,
        data: this.getVirtulData([]),
        lineStyle: {
          color: '#673ab7'
        }
      }
    };

    this.getExpenseData();
  }

  getExpenseData() {
    this.type = 'expense';
    this.homeService.getGroupExpenseData(this.monthStart, this.monthEnd, false).then((list) => {
      this.updateOptions = {
        title: {
          text: '2020/04 Month of Expense'
        },
        series: {
          data: this.getVirtulData(list)
        },
      };
    });

    this.homeService.getGroupExpenseData(this.monthStart, this.monthEnd, true).then((list) => {
      if (list && list.length) {
        this.list = list;
        this.sum = list.reduce((prev, item) => {
          return (item.amount * 1000 + prev * 1000) / 1000;
        }, 0);

        for (const item of list) {
          item.percent = (item.amount / this.sum) * 100;
        }
      }
    });
  }

  getIncomeData() {
    this.type = 'income';
    this.homeService.getGroupIncomeData(this.monthStart, this.monthEnd, false).then((list) => {
      if (list && list.length) {
        this.updateOptions = {
          title: {
            text: '2020/04 Month of Income'
          },
          series: {
            data: this.getVirtulData(list),
            lineStyle: {
              color: '#f44336'
            }
          },
        };
      }

    });

    this.homeService.getGroupIncomeData(this.monthStart, this.monthEnd, true).then((list) => {
      this.list = list;
      if (list && list.length) {
        this.sum = list.reduce((prev, item) => {
          return (item.amount * 1000 + prev * 1000) / 1000;
        }, 0);
        for (const item of list) {
          item.percent = (item.amount / this.sum) * 100;
        }
      }

    });
  }

  getVirtulData(list) {
    const start = new Date(this.monthStart).getTime();
    const end = new Date(this.monthEnd).getTime();

    const dayTime = 3600 * 24 * 1000;
    const data = [];

    for (let time = start; time <= end; time += dayTime) {
      const findItem = _.find(list, (item) => {
        return item.date === moment(new Date(time)).format('YYYY/MM/DD');
      });

      if (findItem) {
        data.push([
          moment(new Date(time)).format('YYYY/MM/DD'),
          findItem.amount
        ]);
      } else {
        data.push([
          moment(new Date(time)).format('YYYY/MM/DD'),
          0
        ]);
      }
    }
    return data;
  }
}
