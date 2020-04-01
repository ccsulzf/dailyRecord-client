import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  total$: Subscription;
  totalExpenseAmount = 0;
  totalIncomeAmount = 0;
  totalItems = 0;

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.total$ = this.homeService.getTotal().subscribe((data: any) => {
      for (const item of data) {
        this.totalExpenseAmount += Number(item.expenseTotalAmount || 0);
        this.totalIncomeAmount += Number(item.incomeTotalAmount || 0);
        this.totalItems += Number(item.totalCount);
      }
    });
  }

}
