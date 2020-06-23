import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './password/login/login.component';
import { RegisterComponent } from './password/register/register.component';
import { VerifyEmailComponent } from './password/verify-email/verify-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy';
import { AuthGuard } from '../auth/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent
      },
      {
        path: 'record',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/money-record/money-record.module').then(mod => mod.MoneyRecordModule),
        data: { preload: true }
      },
      {
        path: 'report',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/report/report.module').then(mod => mod.ReportModule)
      },
      {
        path: 'setting',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/setting/setting.module').then(mod => mod.SettingModule)
      },
      {
        path: 'chart',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/chart/chart.module').then(mod => mod.ChartModule)
      }
    ]
  }, {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'verify-email/:code',
    component: VerifyEmailComponent
  },
  {
    path: '**',
    component: LoginComponent
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
