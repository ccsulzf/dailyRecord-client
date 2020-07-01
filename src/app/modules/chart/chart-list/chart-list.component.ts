import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.scss']
})
export class ChartListComponent implements OnInit {

  chartList = [{
    title: '支出收入流向图',
    subTitle: '钱从哪里来，到哪里去',
    thumbnail: 'url(../../../../assets/images/flow-chart.jpg)',
    route: '/chart/flow'
  }, {
    title: '支出收入同比图',
    subTitle: '什么少了，什么多了',
    thumbnail: 'url(../../../../assets/images/compare-chart.png)',
    route: '/chart/compare'
  }];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  gotoChart(item) {
    this.router.navigateByUrl(item.route);
  }

}
