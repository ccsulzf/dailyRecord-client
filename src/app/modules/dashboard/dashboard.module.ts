import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardRoutingModule } from './dashboard-routing.module';

import {
  MatTabsModule,
  MatDividerModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { YearCalendarComponent } from './components/home/year-calendar/year-calendar.component';
import { CurrentMonthComponent } from './components/home/current-month/current-month.component';


@NgModule({
  declarations: [DashboardComponent, HomeComponent, YearCalendarComponent, CurrentMonthComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTabsModule,
    MatDividerModule,
    NgxEchartsModule,
    MatProgressSpinnerModule
  ]
})
export class DashboardModule { }
