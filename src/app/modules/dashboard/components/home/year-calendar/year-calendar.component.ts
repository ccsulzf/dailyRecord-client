import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../services';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-year-calendar',
  templateUrl: './year-calendar.component.html',
  styleUrls: ['./year-calendar.component.scss']
})

/**
 * 注意字段里面的range
 */
export class YearCalendarComponent implements OnInit {
  echartsInstance: any;
  // initOpts = {
  //   renderer: 'canvas',
  //   width: 780,
  //   height: 200
  // };

  options: any;
  updateOptions: any;

  private data = [];

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.options = {
      title: {
        top: 5,
        left: 'center',
        text: 'Expense Calendar In 2019',
        textStyle: {
          fontWeight: 400
        }
      },
      tooltip: {
      },
      visualMap: {
        min: 1,
        max: 1000,
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        top: 35,
        textStyle: {
          color: '#000'
        },
        inRange: {
          color: ['#ede7f6', '#b39ddb', '#673ab7', '#311b92'],
        }
      },
      calendar: {
        top: 80,
        left: 30,
        right: 30,
        cellSize: ['auto', 13],
        range: '2020',
        splitLine: {
          lineStyle: {
            color: '#263238'
          }
        },
        yearLabel: { show: false },
        dayLabel: {
          nameMap: 'cn',
          firstDay: 1
        },
        monthLabel: {
          nameMap: 'cn'
        }
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: this.data
      }
    };
    this.getData();
  }

  getData() {
    this.homeService.getGroupExpenseData(moment().format('YYYY-01-01'), moment().format('YYYY-12-31'), false).then((list) => {
      if (list && list.length) {
        this.updateOptions = {
          series: {
            data: this.getVirtulData(2020, list)
          }
        };
      }

      // this.options.series.data = this.list;
    });
  }

  onChartInit(e) {
    this.echartsInstance = e;
  }

  getVirtulData(year, list) {
    const start = new Date(year + '-01-01').getTime();

    const end = new Date((+year + 1) + '-01-01').getTime();

    const dayTime = 3600 * 24 * 1000;
    const data = [];

    for (let time = start; time < end; time += dayTime) {
      const findItem = _.find(list, (item) => {
        return item.expenseDate === moment(new Date(time)).format('YYYY-MM-DD');
      });

      if (findItem) {
        data.push([
          moment(new Date(time)).format('YYYY-MM-DD'),
          findItem.amount
        ]);
      } else {
        data.push([
          moment(new Date(time)).format('YYYY-MM-DD'),
          0
        ]);
      }
    }
    return data;
  }


}
