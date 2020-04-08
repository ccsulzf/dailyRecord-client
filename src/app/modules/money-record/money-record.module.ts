import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import {
  MatSliderModule, MatButtonModule, MatInputModule,
  MatFormFieldModule, MatExpansionModule, MatDividerModule,
  MatDatepickerModule, MatListModule, MatIconModule
} from '@angular/material';

import { MoneyRecordRoutingModule } from './money-record-routing.module';
import { MoneyRecordComponent } from './money-record.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { IncomeComponent } from './components/income/income.component';
import { ExpenseDetailComponent } from './components/expense/expense-detail/expense-detail.component';
import { EpxenseBookListComponent } from './components/expense/epxense-book-list/epxense-book-list.component';
import { IncomeDetailComponent } from './components/income/income-detail/income-detail.component';

@NgModule({
  declarations: [ExpenseComponent,
    IncomeComponent, MoneyRecordComponent,
    ExpenseDetailComponent, EpxenseBookListComponent, IncomeDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MoneyRecordRoutingModule,
    MatSliderModule,
    MatButtonModule,
    CoreModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDividerModule,
    MatDatepickerModule,
    MatListModule,
    MatIconModule,
  ],

})
export class MoneyRecordModule { }
