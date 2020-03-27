import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { IncomeReportComponent } from './income-report/income-report.component';
const routes: Routes = [
    {
        path: '',
        component: ReportComponent,
        children: [
            { path: 'expense', component: ExpenseReportComponent },
            { path: 'income', component: IncomeReportComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ReportRoutingModule { }
