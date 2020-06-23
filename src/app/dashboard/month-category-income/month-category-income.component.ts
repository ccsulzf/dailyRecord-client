import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services';
@Component({
  selector: 'app-month-category-income',
  templateUrl: './month-category-income.component.html',
  styleUrls: ['./month-category-income.component.scss']
})
export class MonthCategoryIncomeComponent implements OnInit {
  isHide = true;
  list: any;
  constructor(
    private dashboardService: DashboardService
  ) { }

  async ngOnInit() {
    this.list = await this.dashboardService.getIncomeMonthCategoryData();
  }

}
