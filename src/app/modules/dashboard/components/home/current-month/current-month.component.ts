import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-month',
  templateUrl: './current-month.component.html',
  styleUrls: ['./current-month.component.scss']
})

export class CurrentMonthComponent implements OnInit {
  private data = [
    ['2000-06-04', 100],
    ['2000-06-05', 116], ['2000-06-06', 129], ['2000-06-07', 135],
    ['2000-06-08', 86], ['2000-06-09', 73], ['2000-06-10', 85],
    ['2000-06-11', 73], ['2000-06-12', 68], ['2000-06-13', 92],
    ['2000-06-14', 130], ['2000-06-15', 245], ['2000-06-16', 139],
    ['2000-06-17', 115], ['2000-06-18', 111], ['2000-06-19', 309],
    ['2000-06-20', 206], ['2000-06-21', 137], ['2000-06-22', 128],
    ['2000-06-23', 85], ['2000-06-24', 94], ['2000-06-25', 71],
    ['2000-06-26', 106], ['2000-06-27', 84], ['2000-06-28', 93],
    ['2000-06-29', 85], ['2000-06-30', 73]
  ];

  private options = {
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
      text: '2019/06 Expense & Income Line Chart',
      textStyle: {
        fontWeight: 400
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      data: this.data.map((item) => {
        return item[0];
      })
    },
    yAxis: {
      splitLine: { show: false },
    },
    series: [
      {
        name: 'Expense',
        type: 'line',
        showSymbol: false,
        data: this.data.map((item) => {
          return -Math.floor(Math.random() * 100);
        }),
        lineStyle: {
          color: '#673ab7'
        }
      }, {
        name: 'Income',
        type: 'line',
        showSymbol: false,
        data: this.data.map((item) => {
          return Math.floor(Math.random() * 10000);
        }),
        lineStyle: {
          color: '#f44336'
        }
      }
    ]

  };
  constructor() { }

  ngOnInit() {
  }

}
