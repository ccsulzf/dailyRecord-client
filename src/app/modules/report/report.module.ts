import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  MatIconModule,
  MatSidenavModule,
  MatButtonModule,
  MatBadgeModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatDividerModule,
  MatChipsModule,
  MatSliderModule
} from '@angular/material';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { ReportFilterComponent } from './report-filter/report-filter.component';
import { DateComponent } from './report-filter/filter-items/date/date.component';
import { SelectComponent } from './report-filter/filter-items/select/select.component';
import { InputComponent } from './report-filter/filter-items/input/input.component';
import { RangeComponent } from './report-filter/filter-items/range/range.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ReportRoutingModule,
    RouterModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatBadgeModule,
    MatPaginatorModule,
    AgGridModule.withComponents([]),
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatDividerModule,
    MatChipsModule,
    MatSliderModule
  ],
  declarations: [
    ReportComponent,
    ExpenseReportComponent,
    ReportFilterComponent,
    DateComponent,
    SelectComponent,
    InputComponent,
    RangeComponent
  ],
  providers: [
    // { provide: MAT_DATE_LOCALE, useValue: 'zh-CN' }
  ]
})
export class ReportModule { }
