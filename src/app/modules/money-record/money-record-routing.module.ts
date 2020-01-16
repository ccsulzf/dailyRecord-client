import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoneyRecordComponent } from './money-record.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { IncomeComponent } from './components/income/income.component';
const routes: Routes = [
  {
    path: '',
    component: MoneyRecordComponent,
    children: [
      { path: 'expense', component: ExpenseComponent },
      { path: 'income', component: IncomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoneyRecordRoutingModule { }
