import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
// declare const require: any;
@Component({
  selector: 'app-year-calendar',
  templateUrl: './year-calendar.component.html',
  styleUrls: ['./year-calendar.component.scss']
})
export class YearCalendarComponent implements OnInit {
  echartsInstance: any;
  // initOpts = {
  //   renderer: 'canvas',
  //   width: 780,
  //   height: 200
  // };

  public options = {
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
      min: 0,
      max: 10000,
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
      range: '2019',
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
      data: this.getVirtulData(2019),
    }
  };


  constructor() { }

  ngOnInit() {
  }

  onChartInit(e) {
    this.echartsInstance = e;
  }

  getVirtulData(year) {
    year = year || '2017';
    const date = new Date(year + '-01-01').getTime();

    const end = new Date((+year + 1) + '-01-01').getTime();
    const dayTime = 3600 * 24 * 1000;
    const data = [];
    for (let time = date; time < end; time += dayTime) {
      data.push([
        moment(new Date(time)).format('YYYY-MM-DD'),
        Math.floor(Math.random() * 10000)
      ]);
    }
    return data;
  }


}
