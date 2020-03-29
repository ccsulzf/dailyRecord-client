import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/setting',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(mod => mod.DashboardModule)
  },
  {
    path: 'record',
    loadChildren: () => import('./modules/money-record/money-record.module').then(mod => mod.MoneyRecordModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./modules/report/report.module').then(mod => mod.ReportModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./modules/setting/setting.module').then(mod => mod.SettingModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
