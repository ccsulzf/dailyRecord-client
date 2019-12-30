import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoneyRecordComponent } from './money-record.component';
import { ExpenseComponent } from './components/expense/expense.component';

const routes: Routes = [
  {
    path: '',
    component: MoneyRecordComponent,
    children: [
      { path: 'expense', component: ExpenseComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoneyRecordRoutingModule { }
