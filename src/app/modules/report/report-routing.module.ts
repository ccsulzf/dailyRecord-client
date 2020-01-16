import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';;
const routes: Routes = [
    {
        path: '',
        component: ReportComponent,
        children: [
            // { path: 'expense', component: ExpenseComponent },
            // { path: 'income', component: IncomeComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportRoutingModule { }
