import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(mod => mod.DashboardModule)
  },
  {
    path: 'record',
    loadChildren: () => import('./modules/money-record/money-record.module').then(mod => mod.MoneyRecordModule),
    data: { preload: true }
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
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: SelectivePreloadingStrategyService
  })],
  exports: [RouterModule],
  providers: [SelectivePreloadingStrategyService]
})
export class AppRoutingModule { }
