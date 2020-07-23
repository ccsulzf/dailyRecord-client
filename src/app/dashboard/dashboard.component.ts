import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from '../services';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public year;
  public month;

  dateChange: Subscription;
  constructor(
    public dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.getYearMonth();
    this.dateChange = this.dashboardService.dateChange().subscribe(() => {
      this.getYearMonth();
    });
  }

  getYearMonth() {
    this.year = new Date(this.dashboardService.startDate).getFullYear();
    this.month = new Date(this.dashboardService.startDate).getMonth() + 1;
  }

  prevMonth() {
    this.dashboardService.prevMonth();
  }

  nextMonth() {
    this.dashboardService.nextMonth();
  }

  ngOnDestroy(): void {
    this.dashboardService.initDate();
    if (this.dateChange) {
      this.dateChange.unsubscribe();
    }
  }
}
