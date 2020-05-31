import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public year = new Date().getFullYear();
  public month = new Date().getMonth()+1;
  constructor(
    private dashboardService:DashboardService
  ) { }

  ngOnInit() {
  }

}
