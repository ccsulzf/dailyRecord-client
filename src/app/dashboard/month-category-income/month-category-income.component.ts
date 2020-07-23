import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from '../../services';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-month-category-income',
  templateUrl: './month-category-income.component.html',
  styleUrls: ['./month-category-income.component.scss']
})
export class MonthCategoryIncomeComponent implements OnInit, OnDestroy {
  isHide = true;
  list: any;
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
    this.list = await this.dashboardService.getIncomeMonthCategoryData();
  }

  ngOnDestroy() {
    if (this.dateChange) {
      this.dateChange.unsubscribe();
    }
  }
}
