import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import {
  MatIconModule,
  MatSidenavModule,
  MatButtonModule,
  MatBadgeModule,
  MatPaginatorModule
} from '@angular/material';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { ReportFilterComponent } from './report-filter/report-filter.component';

@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule,
    RouterModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatBadgeModule,
    MatPaginatorModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    ReportComponent,
    ExpenseReportComponent,
    ReportFilterComponent
  ]
})
export class ReportModule { }
