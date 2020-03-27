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
  MatSliderModule,
  MatCheckboxModule,
  MatSelectModule,
  MAT_DATE_LOCALE
} from '@angular/material';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { ReportFilterComponent } from './report-filter/report-filter.component';
import { DateComponent } from './report-filter/filter-items/date/date.component';
import { SelectComponent } from './report-filter/filter-items/select/select.component';
import { InputComponent } from './report-filter/filter-items/input/input.component';
import { RangeComponent } from './report-filter/filter-items/range/range.component';
import { GroupComponent } from './report-filter/filter-items/group/group.component';
import { LabelPeopleComponent } from './report-filter/filter-items/label-people/label-people.component';

import { ReportFilterService, ReportExpenseService, ReportIncomeService } from './services';
import { PageComponent } from './report-filter/filter-items/page/page.component';

import { CustomTooltip } from './grid-components';
import { IncomeReportComponent } from './income-report/income-report.component';
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
    AgGridModule.withComponents([CustomTooltip]),
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatDividerModule,
    MatChipsModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  declarations: [
    ReportComponent,
    ExpenseReportComponent,
    ReportFilterComponent,
    DateComponent,
    SelectComponent,
    InputComponent,
    RangeComponent,
    GroupComponent,
    LabelPeopleComponent,
    PageComponent,
    CustomTooltip,
    IncomeReportComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'zh-CN' },
    ReportFilterService,
    ReportExpenseService,
    ReportIncomeService
  ]
})
export class ReportModule { }
