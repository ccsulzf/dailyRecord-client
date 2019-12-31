import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../../core/core.module';
import { MatSliderModule, MatButtonModule } from '@angular/material';

import { MoneyRecordRoutingModule } from './money-record-routing.module';
import { MoneyRecordComponent } from './money-record.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { IncomeComponent } from './components/income/income.component';
import { ExpenseDetailComponent } from './components/expense/expense-detail/expense-detail.component';
import { EpxenseBookListComponent } from './components/expense/epxense-book-list/epxense-book-list.component';


@NgModule({
  declarations: [ExpenseComponent, IncomeComponent, MoneyRecordComponent, ExpenseDetailComponent, EpxenseBookListComponent],
  imports: [
    CommonModule,
    MoneyRecordRoutingModule,
    MatSliderModule,
    MatButtonModule,
    CoreModule
  ]
})
export class MoneyRecordModule { }
