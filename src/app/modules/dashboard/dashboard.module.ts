import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { HomeService } from './services';
@NgModule({
  declarations: [DashboardComponent, HomeComponent, YearCalendarComponent, CurrentMonthComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTabsModule,
    MatDividerModule,
    NgxEchartsModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  providers: [HomeService]
})
export class DashboardModule { }
